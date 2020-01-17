// data转换成json字符串
// 或返回Document 和 BodyInit 类型，BodyInit 包括了 Blob, BufferSource, FormData, URLSearchParams, ReadableStream, USVString, null。

import { isPlainObject } from './util'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
