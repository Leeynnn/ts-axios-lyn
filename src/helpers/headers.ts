// 预处理请求头的函数
import { isPlainObject } from './util'

// 转换请求头参数名为统一格式的函数
function normalizedHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizedHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    // 如果有data并且没有设置Content-Type的时候，设置默认值 application/json;charset=utf-8
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
