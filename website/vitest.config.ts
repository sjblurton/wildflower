import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        '**/*.astro',
        '**/*.query.ts',
        '**/*.query.test.ts',
        'coverage/**',
        '**/queries.ts',
        '**/*.config.*',
        '**/fixtures.ts',
        'public',
        'dist',
      ],
    },
  },
});
