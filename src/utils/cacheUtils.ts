export function filterFreshCache<T>(
  data: Record<string, { data: T; timestamp: number }>,
  ttl = 10 * 60 * 1000
): Record<string, { data: T; timestamp: number }> {
  const now = Date.now();

  return Object.fromEntries(
    Object.entries(data).filter(([, entry]) => now - entry.timestamp < ttl)
  );
}

// utils/cacheUtils.ts

export function isFreshCache<T>(
  entry: { data: T; timestamp: number } | undefined,
  ttl = 10 * 60 * 1000
): boolean {
  if (!entry) return false;
  return Date.now() - entry.timestamp < ttl;
}
