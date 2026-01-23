import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const swaggerPath = path.resolve(cwd, 'swagger.json')
const outDir = path.resolve(cwd, 'src', 'lib', 'openapi')
const zodDir = path.resolve(outDir, 'zod')

function readJson(file) {
  const raw = fs.readFileSync(file, 'utf-8')
  return JSON.parse(raw)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function pascalCase(str) {
  return String(str)
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')
}

function normalizePathName(p) {
  const segs = p.split('/').filter(Boolean)
  return segs
    .map(s => {
      const m = s.match(/^\{(.+)\}$/)
      if (m) return 'By' + pascalCase(m[1])
      return pascalCase(s)
    })
    .join('')
}

function methodName(m) {
  return pascalCase(m.toLowerCase())
}

function pickResponseSchema(responses) {
  if (!responses || typeof responses !== 'object') return null
  const preferred = ['200', '201', '202']
  for (const code of preferred) {
    const r = responses[code]
    if (
      r &&
      r.content &&
      r.content['application/json'] &&
      r.content['application/json'].schema
    ) {
      return r.content['application/json'].schema
    }
  }
  for (const [_, r] of Object.entries(responses)) {
    if (
      r &&
      r.content &&
      r.content['application/json'] &&
      r.content['application/json'].schema
    ) {
      return r.content['application/json'].schema
    }
  }
  return null
}

function jsonSchemaToTs(schema) {
  if (!schema) return 'unknown'
  if (schema.$ref) return 'unknown'
  if (schema.anyOf) {
    const parts = schema.anyOf.map(jsonSchemaToTs)
    return parts.join(' | ')
  }
  if (schema.oneOf) {
    const parts = schema.oneOf.map(jsonSchemaToTs)
    return parts.join(' | ')
  }
  if (schema.allOf) {
    const parts = schema.allOf.map(jsonSchemaToTs)
    return parts.join(' & ')
  }
  if (schema.enum) {
    return schema.enum
      .map(v => (typeof v === 'string' ? JSON.stringify(v) : String(v)))
      .join(' | ')
  }
  const type = schema.type
  if (!type) return 'unknown'
  if (Array.isArray(type)) {
    return type.map(t => jsonSchemaToTs({ ...schema, type: t })).join(' | ')
  }
  switch (type) {
    case 'string':
      return 'string'
    case 'null':
      return 'null'
    case 'integer':
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'array': {
      const itemT = jsonSchemaToTs(schema.items || {})
      return `${itemT}[]`
    }
    case 'object': {
      const props = schema.properties || {}
      const req = new Set(schema.required || [])
      const entries = Object.entries(props).map(([k, v]) => {
        const optional = req.has(k) ? '' : '?'
        return `${JSON.stringify(k)}${optional}: ${jsonSchemaToTs(v)}`
      })
      return `{ ${entries.join('; ')} }`
    }
    default:
      return 'unknown'
  }
}

function buildParamsTs(parameters = []) {
  const props = []
  for (const p of parameters) {
    const name = p.name || 'param'
    const required = !!p.required
    const schema = p.schema || {}
    const ts = jsonSchemaToTs(schema)
    props.push(`${JSON.stringify(name)}${required ? '' : '?'}: ${ts}`)
  }
  return props.length ? `{ ${props.join('; ')} }` : 'Record<string, never>'
}

function buildQueryTs(parameters = []) {
  const props = []
  for (const p of parameters) {
    if (p.in !== 'query') continue
    const name = p.name || 'query'
    const required = !!p.required
    const schema = p.schema || {}
    const ts = jsonSchemaToTs(schema)
    props.push(`${JSON.stringify(name)}${required ? '' : '?'}: ${ts}`)
  }
  return props.length ? `{ ${props.join('; ')} }` : 'Record<string, never>'
}

function extractParams(parameters = []) {
  return parameters.filter(p => p.in === 'path')
}

function generateTypes(sw) {
  const out = []
  const routes = []
  const paths = sw.paths || {}
  for (const [pathKey, pathItem] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(pathItem)) {
      const tags = op.tags || []
      const tag = tags[0] || 'Default'
      const baseName =
        pascalCase(tag) + methodName(method) + normalizePathName(pathKey)
      const paramsTs = buildParamsTs(extractParams(op.parameters || []))
      const queryTs = buildQueryTs(op.parameters || [])
      let bodySchema = null
      if (
        op.requestBody &&
        op.requestBody.content &&
        op.requestBody.content['application/json']
      ) {
        bodySchema = op.requestBody.content['application/json'].schema || null
      }
      const responseSchema = pickResponseSchema(op.responses)
      const BodyType = jsonSchemaToTs(bodySchema)
      const ResponseType = jsonSchemaToTs(responseSchema)
      out.push(`export type ${baseName}Params = ${paramsTs}`)
      out.push(`export type ${baseName}Query = ${queryTs}`)
      out.push(`export type ${baseName}Body = ${BodyType}`)
      out.push(`export type ${baseName}Response = ${ResponseType}`)
      routes.push({
        tag,
        method: method.toUpperCase(),
        path: pathKey,
        name: baseName,
      })
    }
  }
  return { typesSource: out.join('\n'), routes }
}

function groupRoutes(routes) {
  const grouped = {}
  for (const r of routes) {
    const key = pascalCase(r.tag)
    if (!grouped[key]) grouped[key] = []
    grouped[key].push(r)
  }
  return grouped
}

function buildRoutesSource(routes) {
  const groups = groupRoutes(routes)
  const lines = []
  lines.push(
    `export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'`
  )
  lines.push(
    `export interface RouteDef { tag: string; method: HttpMethod; path: string; name: string }`
  )
  for (const [group, arr] of Object.entries(groups)) {
    const entries = arr
      .map(
        r =>
          `{ tag: ${JSON.stringify(r.tag)}, method: ${JSON.stringify(r.method)}, path: ${JSON.stringify(r.path)}, name: ${JSON.stringify(r.name)} }`
      )
      .join(', ')
    lines.push(`export const ${group}Routes: RouteDef[] = [${entries}]`)
  }
  lines.push(
    `export const AllRoutes: RouteDef[] = [${routes
      .map(
        r =>
          `{ tag: ${JSON.stringify(r.tag)}, method: ${JSON.stringify(r.method)}, path: ${JSON.stringify(r.path)}, name: ${JSON.stringify(r.name)} }`
      )
      .join(', ')}]`
  )
  return lines.join('\n')
}

function jsonSchemaToZod(schema) {
  if (!schema) return 'z.unknown()'
  if (schema.$ref) return 'z.unknown()'
  if (schema.anyOf) {
    const parts = schema.anyOf.map(jsonSchemaToZod)
    return `z.union([${parts.join(', ')}])`
  }
  if (schema.oneOf) {
    const parts = schema.oneOf.map(jsonSchemaToZod)
    return `z.union([${parts.join(', ')}])`
  }
  if (schema.allOf) {
    const parts = schema.allOf.map(jsonSchemaToZod)
    return `z.intersection(${parts.join(', ')})`
  }
  if (schema.enum) {
    const vals = schema.enum
      .map(v => (typeof v === 'string' ? JSON.stringify(v) : String(v)))
      .join(', ')
    return `z.enum([${vals}])`
  }
  const type = schema.type
  if (!type) return 'z.unknown()'
  if (Array.isArray(type)) {
    const parts = type.map(t => jsonSchemaToZod({ ...schema, type: t }))
    return `z.union([${parts.join(', ')}])`
  }
  switch (type) {
    case 'string': {
      return 'z.string()'
    }
    case 'null': {
      return 'z.null()'
    }
    case 'integer':
    case 'number': {
      return 'z.number()'
    }
    case 'boolean': {
      return 'z.boolean()'
    }
    case 'array': {
      const item = jsonSchemaToZod(schema.items || {})
      return `z.array(${item})`
    }
    case 'object': {
      const props = schema.properties || {}
      const req = new Set(schema.required || [])
      const entries = Object.entries(props).map(([k, v]) => {
        const zodProp = jsonSchemaToZod(v)
        const optional = req.has(k) ? '' : '.optional()'
        return `${JSON.stringify(k)}: ${zodProp}${optional}`
      })
      return `z.object({ ${entries.join(', ')} })`
    }
    default:
      return 'z.unknown()'
  }
}

function buildZodSchemas(sw, routes) {
  const groups = groupRoutes(routes)
  ensureDir(zodDir)
  const indexExports = []
  for (const [group, arr] of Object.entries(groups)) {
    const lines = [`import { z } from 'zod'`]
    for (const r of arr) {
      // find operation in swagger
      const op = sw.paths?.[r.path]?.[r.method.toLowerCase()]
      if (!op) continue
      let bodySchema = null
      if (
        op.requestBody &&
        op.requestBody.content &&
        op.requestBody.content['application/json']
      ) {
        bodySchema = op.requestBody.content['application/json'].schema || null
      }
      const respSchema = pickResponseSchema(op.responses)
      const bodyZ = jsonSchemaToZod(bodySchema)
      const respZ = jsonSchemaToZod(respSchema)
      lines.push(`export const ${r.name}BodySchema = ${bodyZ}`)
      lines.push(`export const ${r.name}ResponseSchema = ${respZ}`)
    }
    const filePath = path.join(zodDir, `${group}.ts`)
    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8')
    indexExports.push(`export * from './${group}'`)
  }
  fs.writeFileSync(
    path.join(zodDir, 'index.ts'),
    indexExports.join('\n'),
    'utf-8'
  )
}

function main() {
  const sw = readJson(swaggerPath)
  ensureDir(outDir)
  const { typesSource, routes } = generateTypes(sw)
  fs.writeFileSync(path.join(outDir, 'types.ts'), typesSource, 'utf-8')
  const routesSource = buildRoutesSource(routes)
  fs.writeFileSync(path.join(outDir, 'routes.ts'), routesSource, 'utf-8')
  buildZodSchemas(sw, routes)
}

main()
