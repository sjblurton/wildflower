export const toTrimmedString = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

export const normaliseSlug = (value: string) => {
  if (value === 'home') return '/';
  if (value.startsWith('/')) return value;
  return `/${value}`;
};
