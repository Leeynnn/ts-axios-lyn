import { ResolvedFn } from '../types/index'
import { RejectedFn } from '../index'

export interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

// 拦截器类
export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null> // 存储拦截器方法

  constructor() {
    this.interceptors = []
  }

  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })

    return this.interceptors.length - 1
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }

  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
