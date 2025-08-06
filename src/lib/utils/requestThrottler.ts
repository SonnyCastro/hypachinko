interface ThrottledRequest {
  promise: Promise<unknown>
  timestamp: number
  key: string
}

class RequestThrottler {
  private requests = new Map<string, ThrottledRequest>()
  private batchQueue: Array<{ key: string; fn: () => Promise<unknown>; resolve: (value: unknown) => void; reject: (error: unknown) => void }> = []
  private batchTimeout: NodeJS.Timeout | null = null
  private readonly BATCH_DELAY = 50 // 50ms batching window
  private readonly REQUEST_TTL = 5000 // 5 seconds TTL for pending requests

  async throttleRequest<T>(
    key: string,
    requestFn: () => Promise<T>,
    options: { ttl?: number; deduplicate?: boolean } = {}
  ): Promise<T> {
    const { ttl = this.REQUEST_TTL, deduplicate = true } = options

    // Check for existing pending request
    if (deduplicate) {
      const existing = this.requests.get(key)
      if (existing) {
        const now = Date.now()
        if (now - existing.timestamp < ttl) {
          return existing.promise as Promise<T>
        }
        // Remove expired request
        this.requests.delete(key)
      }
    }

    // Create new request
    const promise = requestFn().finally(() => {
      this.requests.delete(key)
    })

    // Store request
    this.requests.set(key, {
      promise: promise as Promise<unknown>,
      timestamp: Date.now(),
      key,
    })

    return promise
  }

  // Batch multiple requests together
  async batchRequests<T>(
    requests: Array<{ key: string; fn: () => Promise<T> }>,
    options: { maxBatchSize?: number; batchDelay?: number } = {}
  ): Promise<T[]> {
    const { maxBatchSize = 10, batchDelay = this.BATCH_DELAY } = options

    // For now, just execute all requests in parallel
    // This is a simplified implementation
    const results = await Promise.all(
      requests.map(async ({ key, fn }) => {
        return this.throttleRequest(key, fn)
      })
    )

    return results
  }

  private async processBatch() {
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout)
      this.batchTimeout = null
    }

    const batch = this.batchQueue.splice(0, 10) // Process up to 10 at a time
    if (batch.length === 0) return

    try {
      // Execute all requests in parallel
      const results = await Promise.all(
        batch.map(async ({ key, fn, resolve, reject }) => {
          try {
            const result = await this.throttleRequest(key, fn)
            resolve(result)
            return result
          } catch (error) {
            reject(error)
            throw error
          }
        })
      )

      return results
    } catch (error) {
      console.error('Batch request error:', error)
      throw error
    }
  }

  // Clear all pending requests
  clear() {
    this.requests.clear()
    this.batchQueue = []
    if (this.batchTimeout) {
      clearTimeout(this.batchTimeout)
      this.batchTimeout = null
    }
  }

  // Get current queue size
  getQueueSize() {
    return this.batchQueue.length
  }

  // Get pending requests count
  getPendingCount() {
    return this.requests.size
  }
}

// Global throttler instance
export const globalThrottler = new RequestThrottler()

// Convenience function for backward compatibility
export const throttleRequest = <T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> => {
  return globalThrottler.throttleRequest(key, requestFn)
}

// Enhanced throttling with options
export const throttleRequestWithOptions = <T>(
  key: string,
  requestFn: () => Promise<T>,
  options: { ttl?: number; deduplicate?: boolean } = {}
): Promise<T> => {
  return globalThrottler.throttleRequest(key, requestFn, options)
}

// Batch multiple requests
export const batchRequests = <T>(
  requests: Array<{ key: string; fn: () => Promise<T> }>,
  options: { maxBatchSize?: number; batchDelay?: number } = {}
): Promise<T[]> => {
  return globalThrottler.batchRequests(requests, options)
} 