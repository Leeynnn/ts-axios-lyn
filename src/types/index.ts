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
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // type XMLHttpRequestResponseType = "" | "arraybuffer" | "blob" | "document" | "json" | "text"
  timeout?: number
}

export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// 这里为什么要继承Promise类
// 因为我们希望返回的类型是Promise类型的，但是不能直接定义返回类型为Promise，所以用一个接口去定义返回的类型为Promise
// 这里的Promise类是tsc内置的Promise泛型接口
export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}
