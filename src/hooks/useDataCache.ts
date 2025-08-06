import { useRef, useCallback } from 'react'

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

interface PendingRequest<T> {
  promise: Promise<T>
  timestamp: number
}

export function useDataCache() {
  const cache = useRef<Map<string, CacheEntry<unknown>>>(new Map())
  const pendingRequests = useRef<Map<string, PendingRequest<unknown>>>(new Map())

  const get = useCallback(<T>(key: string): T | null => {
    const entry = cache.current.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      cache.current.delete(key)
      return null
    }

    return entry.data as T
  }, [])

  const set = useCallback(<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void => {
    cache.current.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }, [])

  const invalidate = useCallback((pattern?: string): void => {
    if (pattern) {
      // Invalidate keys matching pattern
      for (const key of cache.current.keys()) {
        if (key.includes(pattern)) {
          cache.current.delete(key)
        }
      }
    } else {
      // Invalidate all
      cache.current.clear()
    }
  }, [])

  // Deduplicate requests - if same request is in progress, return existing promise
  const deduplicateRequest = useCallback(<T>(
    key: string,
    requestFn: () => Promise<T>,
    ttl: number = 5 * 60 * 1000
  ): Promise<T> => {
    // Check cache first
    const cached = get<T>(key)
    if (cached) {
      return Promise.resolve(cached)
    }

    // Check if request is already pending
    const pending = pendingRequests.current.get(key)
    if (pending) {
      const now = Date.now()
      // If pending request is recent (within 5 seconds), return it
      if (now - pending.timestamp < 5000) {
        return pending.promise as Promise<T>
      }
      // If too old, remove it
      pendingRequests.current.delete(key)
    }

    // Create new request
    const promise = requestFn().then((result) => {
      set(key, result, ttl)
      pendingRequests.current.delete(key)
      return result
    }).catch((error) => {
      pendingRequests.current.delete(key)
      throw error
    })

    // Store pending request
    pendingRequests.current.set(key, {
      promise,
      timestamp: Date.now(),
    })

    return promise
  }, [get, set])

  return {
    get,
    set,
    invalidate,
    deduplicateRequest,
  }
}

export function useUserDataCache() {
  return useDataCache()
}

// Specialized caches with different TTLs
export function useContractDataCache() {
  return useDataCache() // 10 minutes for contract data
}

export function useStaticDataCache() {
  return useDataCache() // 1 hour for static data
}

// Global cache invalidation manager
class GlobalCacheManager {
  private caches: Set<{ invalidate: (pattern?: string) => void }> = new Set()

  register(cache: { invalidate: (pattern?: string) => void }) {
    this.caches.add(cache)
  }

  unregister(cache: { invalidate: (pattern?: string) => void }) {
    this.caches.delete(cache)
  }

  invalidateAll(pattern?: string) {
    this.caches.forEach(cache => cache.invalidate(pattern))
  }

  invalidateUserData() {
    this.caches.forEach(cache => cache.invalidate('user_data'))
  }

  invalidateContractData() {
    this.caches.forEach(cache => cache.invalidate('lottery_data'))
    this.caches.forEach(cache => cache.invalidate('marketplace_data'))
  }
}

export const globalCacheManager = new GlobalCacheManager()

// Hook to register cache with global manager
export function useGlobalCache() {
  const cache = useDataCache()

  // Register with global manager
  useCallback(() => {
    globalCacheManager.register(cache)
    return () => globalCacheManager.unregister(cache)
  }, [cache])

  return cache
} 