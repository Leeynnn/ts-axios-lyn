// 全局类型配置

// 定义method的字符串字面量类型

// 问：为什么要export type Method?
// 答：这个报错原因应该是你的 AxiosRequestConfig 接口已经 export 了，那么其中 method 属性的类型 Method 也应该要 export 出去，否则的话外面就没法获取 Method 类型，也就无法给 method 属性声明对应的类型了。

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text"
  timeout?: number
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 这里为什么要继承Promise类
// 因为我们希望返回的类型是Promise类型的，但是不能直接定义返回类型为Promise，所以用一个接口去定义返回的类型为Promise
// 这里的Promise类是tsc内置的Promise泛型接口
// 这里的泛型接口Promise<T>里的泛型T会应用到resolve方法的参数类型需要为T类型
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

export interface Axios {
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosPromise): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosPromise): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosPromise): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosPromise): AxiosPromise<T>

  post<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>

  put<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>

  patch<T = any>(url: string, data?: any, config?: AxiosPromise): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}
