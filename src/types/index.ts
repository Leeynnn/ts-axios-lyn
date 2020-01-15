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
}
