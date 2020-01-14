// 全局类型配置

// 定义method的字符串字面量类型
export type Method =
  'get' | 'GET' |
  'delete' | 'DELETE' |
  'head' | 'HEAD' |
  'options' | 'OPTIONS' |
  'post' | 'POST' |
  'put' | 'PUT' |
  'patch' | 'PATCH'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  param?: any
}