import { vi } from 'vitest';

vi.mock('@sanity/client', async () => await import('./src/lib/cms/__mocks__/sanity'));

vi.mock('@sanity/image-url', async () => await import('./src/lib/cms/__mocks__/sanity'));
