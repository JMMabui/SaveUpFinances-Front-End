import { defineConfig } from 'orval';

export default defineConfig({
  myApi: {
    input: {
      target: 'https://localhost:7410/swagger.json',
      validation: false,
    
    },
    output: {
      mode: 'tags-split',
      target: './src/app/api/my-api.ts',
      schemas: './src/generated/models',
      client: 'react-query',
      override: {
        mutator: {
          path: 'src/lib/orvalMutator.ts',
          name: 'orvalMutator',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});