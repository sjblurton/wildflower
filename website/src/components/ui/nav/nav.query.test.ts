import { describe, expect, it } from 'vitest';

import { imageProjection } from '../../../lib/cms/projections/primatives';
import { navLinkProjection } from '../../../lib/cms/projections/links';
import { navSettingsQuery } from './nav.query';

describe('navSettingsQuery', () => {
  it('targets navSettings singleton and includes expected projections', () => {
    expect(navSettingsQuery).toContain('*[_type == "navSettings" && _id == "navSettings"][0]');
    expect(navSettingsQuery).toContain('navSiteName');
    expect(navSettingsQuery).toContain(imageProjection.trim());
    expect(navSettingsQuery).toContain(navLinkProjection.trim());
  });
});
