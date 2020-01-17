// http请求方法

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    // 是否设置请求类型
    if (responseType) {
      request.responseType = responseType
    }

    // 是否设置请求超时
    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url, true)

    // 监听请求状态的变化
    request.onreadystatechange = function handleload() {
      // 4为请求完成 0 初始化请求 1 发送请求 2 接收响应数据 3 正在解析数据 4 完成
      if (request.readyState !== 4) {
        return
      }

      // 发生网络错误或者超时错误时 status 为0
      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // 请求成功
      handleResponse(response)
    }

    // 请求发生错误

    // 网络错误
    request.onerror = function handleError() {
      reject(createError('Network Error', config, null, request))
    }

    // 超时错误
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

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

    // 判断response状态
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
