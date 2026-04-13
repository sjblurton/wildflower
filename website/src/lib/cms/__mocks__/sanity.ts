import { vi } from 'vitest';

export const createClient = vi.fn(() => ({
  fetch: vi.fn().mockResolvedValue({
    _id: 'siteSettings',
    _type: 'siteSettings',
    theme: 'lofi',
  }),
  config: vi.fn(),
}));

function makeImageBuilder() {
  const params = new URLSearchParams();

  const builder = {
    url: () => {
      const query = params.toString();
      return query ? `https://mocked.image.url?${query}` : 'https://mocked.image.url';
    },
    auto: () => builder,
    width: (value: number) => {
      params.set('w', String(value));
      return builder;
    },
    height: (value: number) => {
      params.set('h', String(value));
      return builder;
    },
    quality: (value: number) => {
      params.set('q', String(value));
      return builder;
    },
    fit: () => builder,
  };
  return builder;
}

export const createImageUrlBuilder = vi.fn(() => ({
  image: vi.fn(() => makeImageBuilder()),
}));
