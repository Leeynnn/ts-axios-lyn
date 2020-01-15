// 处理 url 相关的工具函数

import { isDate, isPlainObject } from './util'

// url用encodeURIComponent处理，排除字符 @、:、$、,、 、[、]
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

// 将params参数拼接到url后面的函数
export function buildURL(url: string, params?: any): string {
  // 没有params直接返回url
  if (!params) {
    return url
  }

  // 把params对象里的键值对转换成字符串push到parts数组里
  // 例如：parts = ['a=1', 'b=2']
  // 最终通过join方法得到：a=1&b=2
  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    // 值为空则不添加到url后面
    if (val === null || typeof val === 'undefined') {
      return
    }
    // 定义通用数组，因为params对象里的值可能是数组
    let values = []
    if (Array.isArray(val)) {
      values = val
      // 如果是数组在键后面拼上 []
      // 例如：{a: [1, 2]} 转换成 ['a[]=1', 'a[]=2']
      key += '[]'
    } else {
      values = [val]
    }
    // 遍历通用数组拼接键值对字符串并push到parts里
    // 例如：parts = ['a[]=1', 'a[]=2', 'b=3']
    values.forEach(val => {
      if (isDate(val)) {
        // Date对象通过toISOString转换成字符串
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        // Object对象转换成json字符串
        val = JSON.stringify(val)
      }
      // 将键值对拼接成 a=1 的形式后push到parts里
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })

  // 用join方法得到 a=1&b=2 形式的字符串
  let serializedParams = parts.join('&')

  if (serializedParams) {
    // 截断url里#后面的内容
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    // 判断url里是否已有参数
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
