// Simple in-memory cache for server-side operations
const cache = new Map<string, { data: unknown; timestamp: number; ttl: number }>()

export function getCachedData<T>(key: string): T | null {
  const entry = cache.get(key)
  if (!entry) return null

  const now = Date.now()
  if (now - entry.timestamp > entry.ttl) {
    cache.delete(key)
    return null
  }

  return entry.data as T
}

export function setCachedData<T>(key: string, data: T, ttl: number = 30000): void {
  // Clean up expired entries
  const now = Date.now()
  for (const [cacheKey, entry] of cache.entries()) {
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(cacheKey)
    }
  }

  // Limit cache size
  if (cache.size > 100) {
    const oldestKey = cache.keys().next().value
    if (oldestKey) {
      cache.delete(oldestKey)
    }
  }

  cache.set(key, {
    data,
    timestamp: now,
    ttl
  })
}

export function invalidateCache(pattern?: string): void {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key)
      }
    }
  } else {
    cache.clear()
  }
}

// Cache keys for different types of data
export const CACHE_KEYS = {
  AGGREGATED_DATA: (machineIds: string[]) => `aggregated_data_${machineIds.join('_')}`,
  MACHINE_DATA: (machineId: string) => `machine_data_${machineId}`,
  CONTRACT_STATUS: (contractAddress: string) => `contract_status_${contractAddress}`,
} as const 