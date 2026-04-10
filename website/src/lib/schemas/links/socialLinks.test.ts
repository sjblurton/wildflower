import { describe, it, expect } from 'vitest';
import { socialLinksSchema } from './socialLinks';

describe('socialLinksSchema', () => {
  it('validates a correct social link', () => {
    const valid = {
      _key: 'abc',
      _type: 'socialLink',
      title: 'My Facebook',
      platform: 'facebook',
      url: 'https://facebook.com/myprofile',
      icon: {
        _type: 'image',
        alt: 'icon',
        asset: { _ref: 'image-Tb9Ew8CXIwaY6R1kjMvI0uRR-2000x3000-jpg', _type: 'reference' },
      },
      label: 'Facebook',
      handle: 'myprofile',
    };
    expect(socialLinksSchema.safeParse(valid).success).toBe(true);
  });

  it('fails validation for missing _key', () => {
    const invalid = {
      _type: 'socialLink',
      title: 'My Facebook',
      platform: 'facebook',
      url: 'https://facebook.com/myprofile',
    };
    expect(socialLinksSchema.safeParse(invalid).success).toBe(false);
  });

  it('fails validation for invalid platform', () => {
    const invalid = {
      _key: 'abc',
      _type: 'socialLink',
      title: 'My Unknown',
      platform: 'unknown',
      url: 'https://unknown.com',
    };
    expect(socialLinksSchema.safeParse(invalid).success).toBe(false);
  });
});
