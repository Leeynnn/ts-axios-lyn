import axios from '../../src/index'

// get请求时给parmas传不同类型的参数
// 最终拼接的到url的效果

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })

// post请求时给data传Object类型和其他类型的数据

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})

const arr = new Int32Array([21, 31])

axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})

// post请求时设置请求头

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'content-type': 'application/json;charset=utf-8',
//     'Authorization': 'bearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODE2NDc3NzEsImlhdCI6MTU3OTA1NTc3MSwiaXNzIjoiaHR0cDovLzoiLCJuYmYiOjE1NzkwNTU3NzEsInN1YiI6IjEyOTk5NTQifQ.NDiyMtx03w7hvbWBlEhSYpcUx3ME71f2FT8NAG-k7Iw'
//   },
//   data: {
//     a: 1,
//     b: 2
//   }
// })


// const paramsString = 'q=URLUtils.searchParams&topic=api'
// const searchParams = new URLSearchParams(paramsString)

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: searchParams
// })

// 代码获取异步请求返回的数据

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then((res) => {
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  responseType: 'json',
  data: {
    a: 3,
    b: 4
  }
}).then((res) => {
  console.log(res)
})
