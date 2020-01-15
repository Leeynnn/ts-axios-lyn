// 全局入口文件

import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): void {
  // 预处理后的config
  processConfig(config)
  // 发起请求
  xhr(config)
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
  return buildURL(url, params)
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

export default axios
