import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: './swagger.json',
      // target: "http://localhost:7410/docs/json",
      validation: false,
    },
    output: {
      target: './src/lib/api/backend.ts',
      client: 'react-query',
      mode: 'split',
      schemas: './src/lib/api/model',
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: 'src/lib/api/orvalMutator.ts',
          name: 'customAxios',
        },
      },
    },
  },
})
