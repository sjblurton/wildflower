import { getViteConfig } from 'astro/config';

export default getViteConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
        statements: 90,
      },
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
