// http请求方法

import { AxiosRequestConfig } from './types'

export default function xhr(config: AxiosRequestConfig): void {
  const { url, method = 'get', data = null, headers } = config

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true)

  // 设置请求头
  Object.keys(headers).forEach(name => {
    if (data === null && name.toLowerCase() === 'content-type') {
      delete headers[name]
    } else {
      // 用户自定义请求头
      request.setRequestHeader(name, headers[name])
    }
  })

  request.send(data)
}
