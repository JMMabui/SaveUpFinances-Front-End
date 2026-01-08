import { defineConfig } from 'orval';

export default defineConfig({
  saveup: {
    input: {
      // Ajuste a URL caso seu endpoint do swagger.json seja diferente
      target: 'http://localhost:7410/docs/json',
    },
    output: {
      mode: 'tags',
      target: 'src/lib/generated/saveup.api.ts',
      client: 'react-query',
      // Usa mutator para delegar requisições ao `apiClient` existente
      override: {
        mutator: {
          path: 'src/lib/orvalMutator.ts',
          name: 'orvalMutator',
        },
      },
    },
  },
});
