import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  // 预处理后的config
  processConfig(config)
  // 发起请求
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// 对config进行预处理
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}

// 将params里的键值对处理成url后面的参数
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

// 当data为对象时转换成json字符串
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 预处理headers请求头
function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

// 预处理请求返回的data，如果为json字符串则转换成对象
function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
