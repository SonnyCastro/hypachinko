interface PerformanceMetric {
  name: string
  startTime: number
  endTime?: number
  duration?: number
  success: boolean
  error?: string
  metadata?: Record<string, any>
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private activeMetrics = new Map<string, PerformanceMetric>()
  private readonly MAX_METRICS = 1000

  startMetric(name: string, metadata?: Record<string, any>): string {
    const id = `${name}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      success: false,
      metadata,
    }

    this.activeMetrics.set(id, metric)
    return id
  }

  endMetric(id: string, success: boolean = true, error?: string): void {
    const metric = this.activeMetrics.get(id)
    if (!metric) return

    metric.endTime = performance.now()
    metric.duration = metric.endTime - metric.startTime
    metric.success = success
    if (error) metric.error = error

    this.metrics.push(metric)
    this.activeMetrics.delete(id)

    // Cleanup old metrics
    if (this.metrics.length > this.MAX_METRICS) {
      this.metrics = this.metrics.slice(-this.MAX_METRICS / 2)
    }
  }

  getMetrics(name?: string): PerformanceMetric[] {
    if (name) {
      return this.metrics.filter(m => m.name === name)
    }
    return [...this.metrics]
  }

  getAverageDuration(name: string): number {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) return 0

    const total = metrics.reduce((sum, m) => sum + (m.duration || 0), 0)
    return total / metrics.length
  }

  getSuccessRate(name: string): number {
    const metrics = this.getMetrics(name)
    if (metrics.length === 0) return 0

    const successful = metrics.filter(m => m.success).length
    return successful / metrics.length
  }

  getRPCStats(): {
    totalCalls: number
    averageDuration: number
    successRate: number
    recentCalls: number
  } {
    const rpcMetrics = this.getMetrics('rpc_call')
    const recentMetrics = rpcMetrics.filter(m =>
      m.startTime > performance.now() - 60000 // Last minute
    )

    return {
      totalCalls: rpcMetrics.length,
      averageDuration: this.getAverageDuration('rpc_call'),
      successRate: this.getSuccessRate('rpc_call'),
      recentCalls: recentMetrics.length,
    }
  }

  clear(): void {
    this.metrics = []
    this.activeMetrics.clear()
  }

  // Auto-track RPC calls
  trackRPC<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const id = this.startMetric('rpc_call', { name })

    return fn()
      .then((result) => {
        this.endMetric(id, true)
        return result
      })
      .catch((error) => {
        this.endMetric(id, false, error.message)
        throw error
      })
  }

  // Track multicall performance
  trackMulticall<T>(calls: number, fn: () => Promise<T>): Promise<T> {
    const id = this.startMetric('multicall', { calls })

    return fn()
      .then((result) => {
        this.endMetric(id, true)
        return result
      })
      .catch((error) => {
        this.endMetric(id, false, error.message)
        throw error
      })
  }
}

// Global performance monitor
export const performanceMonitor = new PerformanceMonitor()

// React hook for performance monitoring
export function usePerformanceMonitor() {
  return {
    trackRPC: performanceMonitor.trackRPC.bind(performanceMonitor),
    trackMulticall: performanceMonitor.trackMulticall.bind(performanceMonitor),
    getRPCStats: performanceMonitor.getRPCStats.bind(performanceMonitor),
    getMetrics: performanceMonitor.getMetrics.bind(performanceMonitor),
    clear: performanceMonitor.clear.bind(performanceMonitor),
  }
}

// Debug utility to log performance stats
export function logPerformanceStats(): void {
  const stats = performanceMonitor.getRPCStats()
  console.log('🚀 Performance Stats:', {
    totalRPCs: stats.totalCalls,
    avgDuration: `${stats.averageDuration.toFixed(2)}ms`,
    successRate: `${(stats.successRate * 100).toFixed(1)}%`,
    recentCalls: stats.recentCalls,
  })
}

// Auto-log stats every 30 seconds in development
if (process.env.NODE_ENV === 'development') {
  setInterval(logPerformanceStats, 30000)
} 