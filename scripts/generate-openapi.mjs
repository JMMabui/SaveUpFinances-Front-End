import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const swaggerPath = path.resolve(cwd, 'swagger.json')
const outDir = path.resolve(cwd, 'src', 'lib', 'openapi')
const zodDir = path.resolve(outDir, 'zod')
const httpDir = path.resolve(cwd, 'src', 'lib', 'HTTP')
const typeDir = path.resolve(httpDir, 'Type')

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

function normalizeParamAlias(name) {
  if (name === 'id') return 'ById'
  if (name === 'userId') return 'ByUser'
  if (name === 'accountId') return 'ByAccount'
  if (name === 'categoryId') return 'ByCategory'
  if (name === 'creditCardId') return 'ByCreditCard'
  if (name.endsWith('Id')) return 'ById'
  return 'By' + pascalCase(name)
}

function normalizePathName(p, tagNamePascal) {
  const segs = p.split('/').filter(Boolean)
  let parts = segs
    .map(s => {
      const m = s.match(/^\{(.+)\}$/)
      if (m) return normalizeParamAlias(m[1])
      const pas = pascalCase(s)
      // drop segment if it equals the tag name (resource duplication)
      if (pas === tagNamePascal) return ''
      return pas
    })
    .filter(Boolean)

  // compress patterns like "User" + "ByUser" -> "ByUser"
  const compressPairs = [
    ['User', 'ByUser'],
    ['Account', 'ByAccount'],
    ['Category', 'ByCategory'],
    ['CreditCard', 'ByCreditCard'],
    ['Transactions', 'ByTransactions'],
    ['Debt', 'ByDebt'],
    ['Bank', 'ByBank'],
    ['Income', 'ByIncome'],
    ['Investment', 'ByInvestment'],
    ['Default', 'ByDefault'],
  ]
  for (let i = 0; i < parts.length - 1; i++) {
    for (const [lit, by] of compressPairs) {
      if (parts[i] === lit && parts[i + 1] === by) {
        parts[i] = ''
      }
    }
  }
  parts = parts.filter(Boolean)

  return parts.join('')
}

function methodName(m) {
  return pascalCase(m.toLowerCase())
}

function isArraySchema(schema) {
  if (!schema) return false
  if (schema.type === 'array') return true
  if (Array.isArray(schema.type) && schema.type.includes('array')) return true
  if (schema.anyOf) return schema.anyOf.some(s => isArraySchema(s))
  if (schema.oneOf) return schema.oneOf.some(s => isArraySchema(s))
  if (schema.allOf) return schema.allOf.some(s => isArraySchema(s))
  return false
}

function resolveAction(method, responseSchema, pathKey, tagNamePascal) {
  const suffix = normalizePathName(pathKey, tagNamePascal)
  switch (method.toLowerCase()) {
    case 'get': {
      const isList = isArraySchema(responseSchema)
      const base = isList ? 'List' : 'Get'
      return base + (suffix ? suffix : '')
    }
    case 'post':
      return 'Create' + (suffix ? suffix : '')
    case 'put':
    case 'patch':
      return 'Update' + (suffix ? suffix : '')
    case 'delete':
      return 'Delete' + (suffix ? suffix : '')
    default:
      return methodName(method) + (suffix ? suffix : '')
  }
}

function pickResponseSchema(responses) {
  if (!responses || typeof responses !== 'object') return null
  const preferred = ['200', '201', '202']
  for (const code of preferred) {
    const r = responses[code]
    if (r?.content?.['application/json']?.schema) {
      return r.content['application/json'].schema
    }
  }
  for (const [_, r] of Object.entries(responses)) {
    if (r?.content?.['application/json']?.schema) {
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
      const tagNamePascal = pascalCase(tag)
      let bodySchema = null
      if (op.requestBody?.content?.['application/json']) {
        bodySchema = op.requestBody.content['application/json'].schema || null
      }
      const responseSchema = pickResponseSchema(op.responses)
      const actionName = resolveAction(
        method,
        responseSchema,
        pathKey,
        tagNamePascal
      )
      const baseName = tagNamePascal + actionName
      const paramsTs = buildParamsTs(extractParams(op.parameters || []))
      const queryTs = buildQueryTs(op.parameters || [])
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
    const enums = schema.enum
    const stringVals = enums.filter(v => typeof v === 'string')
    const otherVals = enums.filter(v => typeof v !== 'string' && v !== null)
    const hasNull = enums.some(v => v === null)
    const parts = []
    if (stringVals.length) {
      parts.push(
        `z.enum([${stringVals.map(v => JSON.stringify(v)).join(', ')}])`
      )
    }
    for (const v of otherVals) {
      parts.push(`z.literal(${JSON.stringify(v)})`)
    }
    if (hasNull) {
      parts.push('z.null()')
    }
    return parts.length === 1 ? parts[0] : `z.union([${parts.join(', ')}])`
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
      if (op.requestBody?.content?.['application/json']) {
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

function extractTag(tag) {
  // Convert tag to kebab-case for filename
  return tag
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function buildTypeFiles(routes, sw) {
  const groups = groupRoutes(routes)
  ensureDir(typeDir)

  for (const [group, arr] of Object.entries(groups)) {
    const fileName = extractTag(group)
    const filePath = path.join(typeDir, `${fileName}.type.ts`)

    const lines = [
      `// Auto-generated from Swagger API`,
      `// Generated on: ${new Date().toISOString()}`,
      `import { z } from 'zod'`,
    ]

    const importSchemas = []
    const bodyExports = []
    const responseExports = []

    for (const r of arr) {
      const op = sw.paths?.[r.path]?.[r.method.toLowerCase()]
      if (!op) continue
      const hasBody = !!op.requestBody?.content?.['application/json']?.schema
      const hasResponse = !!pickResponseSchema(op.responses)
      if (hasBody) {
        importSchemas.push(`${r.name}BodySchema`)
        bodyExports.push(
          `export type ${r.name}Body = z.infer<typeof ${r.name}BodySchema>`
        )
      }
      if (hasResponse) {
        importSchemas.push(`${r.name}ResponseSchema`)
        responseExports.push(
          `export type ${r.name}Response = z.infer<typeof ${r.name}ResponseSchema>`
        )
      }
    }

    if (importSchemas.length > 0) {
      lines.push(
        `import type { ${importSchemas.join(
          ', '
        )} } from '@/lib/openapi/zod/${group}'`
      )
    }
    lines.push(``)
    lines.push(...responseExports)
    lines.push(...bodyExports)

    // Legacy type aliases for compatibility
    if (group === 'Debts') {
      lines.push(`export type debtsResponse = DebtsGetResponse['data'][number]`)
      lines.push(`export type debtsRequest = DebtsCreateBody`)
    }
    if (group === 'Transactions') {
      lines.push(
        `export type TransactionResponse = TransactionsGetTransactionByIdResponse['data']`
      )
    }

    if (lines.length > 3) {
      fs.writeFileSync(filePath, lines.join('\n'), 'utf-8')
      console.log(`✓ Updated ${fileName}.type.ts`)
    }
  }
}

function buildHttpFiles(routes, sw) {
  const groups = groupRoutes(routes)
  ensureDir(httpDir)

  for (const [group, arr] of Object.entries(groups)) {
    const fileName = extractTag(group)
    const filePath = path.join(httpDir, `${fileName}.ts`)

    // determine which hooks/utilities are needed
    let needsMutation = false
    let needsQuery = false
    let needsQueryClient = false
    let needsToast = false
    for (const r of arr) {
      if (r.method === 'GET') needsQuery = true
      if (
        r.method === 'POST' ||
        r.method === 'PUT' ||
        r.method === 'PATCH' ||
        r.method === 'DELETE'
      ) {
        needsMutation = true
        needsQueryClient = true
        needsToast = true
      }
    }
    const rqImports = [
      needsMutation ? 'useMutation' : null,
      needsQuery ? 'useQuery' : null,
      needsQueryClient ? 'useQueryClient' : null,
    ].filter(Boolean)
    const lines = []
    if (rqImports.length) {
      lines.push(
        `import { ${rqImports.join(', ')} } from '@tanstack/react-query'`
      )
    } else {
      // fallback to useQuery to avoid empty import (rare)
      lines.push(`import { useQuery } from '@tanstack/react-query'`)
    }
    if (needsToast) {
      lines.push(`import { useToast } from '@/components/ui/toast'`)
    }
    lines.push(`import { apiService } from '../apiServices'`)

    // Collect all types needed
    const types = []
    const bodySchemasImport = []
    const responseSchemasImport = []
    for (const r of arr) {
      const op = sw.paths?.[r.path]?.[r.method.toLowerCase()]
      if (op) {
        const respSchema = pickResponseSchema(op.responses)
        if (respSchema) {
          types.push(`${r.name}Response`)
          if (r.method === 'GET') {
            responseSchemasImport.push(`${r.name}ResponseSchema`)
          }
        }
        if (op.requestBody?.content?.['application/json']?.schema) {
          types.push(`${r.name}Body`)
          bodySchemasImport.push(`${r.name}BodySchema`)
        }
      }
    }

    // omit unused type imports to avoid TS6192

    if (bodySchemasImport.length > 0 || responseSchemasImport.length > 0) {
      lines.push(
        `import { ${[...responseSchemasImport, ...bodySchemasImport].join(
          ', '
        )} } from '@/lib/openapi/zod/${group}'`
      )
    }
    lines.push(``)

    // Generate hooks from routes
    const createdHooks = new Set()
    for (const r of arr) {
      const op = sw.paths?.[r.path]?.[r.method.toLowerCase()]
      if (!op) continue

      const hookName = `use${r.name}`
      createdHooks.add(hookName)
      const pathParamNamesFromPath = (r.path.match(/\{([^}]+)\}/g) || []).map(
        s => s.slice(1, -1)
      )
      const hasParams = pathParamNamesFromPath.length > 0
      const hasQuery = (op.parameters || []).some(p => p.in === 'query')
      const _hasBody = !!op.requestBody?.content?.['application/json']?.schema
      const friendlyName = fileName.replace(/-/g, ' ').trim()

      if (r.method === 'GET') {
        lines.push(
          `export function ${hookName}(${hasParams || hasQuery ? 'params?: any' : ''}) {`
        )
        lines.push(`  return useQuery({`)
        lines.push(
          `    queryKey: ['get-${fileName}', ${hasParams || hasQuery ? 'params' : 'undefined'}],`
        )
        lines.push(`    queryFn: async (): Promise<any> => {`)
        let buildPathLine = `const _path = '${r.path}'`
        for (const pName of pathParamNamesFromPath) {
          buildPathLine += `.replace('{${pName}}', encodeURIComponent(String((params ?? {})['${pName}'] ?? '')))`
        }
        lines.push(`      ${buildPathLine}`)
        if (hasQuery) {
          const queryParamNames = (op.parameters || [])
            .filter(p => p.in === 'query')
            .map(p => p.name)
          lines.push(`      const _usp = new URLSearchParams()`)
          for (const qName of queryParamNames) {
            lines.push(
              `      if ((params ?? {})['${qName}'] !== undefined && (params ?? {})['${qName}'] !== null) { _usp.append('${qName}', String((params ?? {})['${qName}'])) }`
            )
          }
          lines.push(
            `      const _url = _path + (_usp.toString() ? \`?\${_usp.toString()}\` : '')`
          )
        } else {
          lines.push(`      const _url = _path`)
        }
        lines.push(`      const res = await apiService.get(_url)`)
        if (responseSchemasImport.includes(`${r.name}ResponseSchema`)) {
          lines.push(
            `      return ${r.name}ResponseSchema.safeParse(res).success ? ${r.name}ResponseSchema.parse(res) : res`
          )
        } else {
          lines.push(`      return res`)
        }
        lines.push(`    },`)
        lines.push(
          `    enabled: ${hasParams ? 'Object.values(params || {}).every(Boolean)' : 'true'},`
        )
        lines.push(`  })`)
        lines.push(`}`)
      } else if (
        r.method === 'POST' ||
        r.method === 'PUT' ||
        r.method === 'PATCH'
      ) {
        lines.push(`export function ${hookName}() {`)
        lines.push(`  const queryClient = useQueryClient()`)
        lines.push(`  const { success, error } = useToast()`)
        lines.push(``)
        lines.push(`  return useMutation({`)
        const pathParamsNames = pathParamNamesFromPath
        if (_hasBody && bodySchemasImport.includes(`${r.name}BodySchema`)) {
          lines.push(
            `    mutationFn: async (data: any) => { const parsed = ${r.name}BodySchema.parse(data); let _path = '${r.path}';`
          )
        } else {
          lines.push(
            `    mutationFn: async (data: any) => { let _path = '${r.path}';`
          )
        }
        for (const pName of pathParamsNames) {
          lines.push(
            `      _path = _path.replace('{${pName}}', encodeURIComponent(String((data ?? {})['${pName}'] ?? '')))`
          )
        }
        lines.push(
          `      return apiService.${r.method === 'POST' ? 'post' : r.method === 'PUT' ? 'put' : 'patch'}(_path, ${_hasBody && bodySchemasImport.includes(`${r.name}BodySchema`) ? 'parsed' : 'data'}) },`
        )
        lines.push(`    onSuccess: () => {`)
        lines.push(
          `      queryClient.invalidateQueries({ queryKey: ['get-${fileName}'] })`
        )
        const successMsg =
          r.method === 'POST'
            ? `${friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1)} criado com sucesso`
            : `${friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1)} atualizado com sucesso`
        const errorMsg =
          r.method === 'POST'
            ? `Erro ao criar ${friendlyName.toLowerCase()}`
            : `Erro ao atualizar ${friendlyName.toLowerCase()}`
        lines.push(`      success('${successMsg}')`)
        lines.push(`    },`)
        lines.push(`    onError: () => {`)
        lines.push(`      error('${errorMsg}')`)
        lines.push(`    },`)
        lines.push(`  })`)
        lines.push(`}`)
      } else if (r.method === 'DELETE') {
        lines.push(`export function ${hookName}() {`)
        lines.push(`  const queryClient = useQueryClient()`)
        lines.push(`  const { success, error } = useToast()`)
        lines.push(``)
        lines.push(`  return useMutation({`)
        const pathParamsNames = pathParamNamesFromPath
        if (pathParamsNames.length === 1) {
          const pName = pathParamsNames[0]
          lines.push(
            `    mutationFn: async (${pName}: string) => apiService.delete('${r.path}'.replace('{${pName}}', ${pName})),`
          )
        } else {
          // Fallback to object params if multiple path params
          lines.push(
            `    mutationFn: async (params: any) => { let _path = '${r.path}';`
          )
          for (const pName of pathParamsNames) {
            lines.push(
              `      _path = _path.replace('{${pName}}', encodeURIComponent(String((params ?? {})['${pName}'] ?? '')))`
            )
          }
          lines.push(`      return apiService.delete(_path) },`)
        }
        lines.push(`    onSuccess: () => {`)
        lines.push(
          `      queryClient.invalidateQueries({ queryKey: ['get-${fileName}'] })`
        )
        lines.push(
          `      success('${friendlyName.charAt(0).toUpperCase() + friendlyName.slice(1)} deletado com sucesso')`
        )
        lines.push(`    },`)
        lines.push(`    onError: () => {`)
        lines.push(
          `      error('Erro ao deletar ${friendlyName.toLowerCase()}')`
        )
        lines.push(`    },`)
        lines.push(`  })`)
        lines.push(`}`)
      }
      lines.push(``)
    }

    // Backwards-compatibility aliases
    let singular = group.endsWith('s') ? group.slice(0, -1) : group
    if (group === 'Categories') singular = 'Category'
    if (createdHooks.has(`use${group}Create`)) {
      lines.push(`export { use${group}Create as useCreate${singular} }`)
    }
    if (createdHooks.has(`use${group}UpdateById`)) {
      lines.push(`export { use${group}UpdateById as useUpdate${singular} }`)
    }
    if (group === 'Categories') {
      lines.push(`export { useCategoriesCreate as useCreateCategory }`)
      lines.push(`export { useCategoriesUpdateById as useUpdateCategory }`)
      lines.push(
        `export { useCategoriesDeleteCateoriesById as useDeleteCategory }`
      )
    } else {
      if (createdHooks.has(`use${group}DeleteById`)) {
        lines.push(`export { use${group}DeleteById as useDelete${singular} }`)
      }
    }
    if (createdHooks.has(`use${group}Get`)) {
      lines.push(`export { use${group}Get as useGet${group} }`)
    }
    if (createdHooks.has(`use${group}GetById`)) {
      const aliasA = `useGet${group}ById`
      const aliasB = `useGet${singular}ById`
      lines.push(`export { use${group}GetById as ${aliasA} }`)
      if (aliasB !== aliasA) {
        lines.push(`export { use${group}GetById as ${aliasB} }`)
      }
    }
    if (createdHooks.has(`use${group}GetByUser`)) {
      lines.push(`export { use${group}GetByUser as useGet${group}ByUser }`)
    }

    fs.writeFileSync(filePath, lines.join('\n'), 'utf-8')
    console.log(`✓ Generated ${fileName}.ts`)
  }
}

function main() {
  console.log('📦 Generating OpenAPI files...\n')
  const sw = readJson(swaggerPath)
  ensureDir(outDir)
  const { typesSource, routes } = generateTypes(sw)
  fs.writeFileSync(path.join(outDir, 'types.ts'), typesSource, 'utf-8')
  console.log('✓ Generated types.ts')

  const routesSource = buildRoutesSource(routes)
  fs.writeFileSync(path.join(outDir, 'routes.ts'), routesSource, 'utf-8')
  console.log('✓ Generated routes.ts')

  buildZodSchemas(sw, routes)
  console.log('✓ Generated Zod schemas\n')

  console.log('📝 Generating Type files...\n')
  buildTypeFiles(routes, sw)

  console.log('\n📡 Generating HTTP hook files...\n')
  buildHttpFiles(routes, sw)

  console.log('\n✅ All files generated successfully!')
}

main()
