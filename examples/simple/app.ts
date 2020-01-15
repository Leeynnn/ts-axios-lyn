import axios from '../../src/index'

axios({
  method: 'get',
  url: '/simple/get?key=value',
  params: {
    a: 1,
    b: {
      name: 'Jack',
      age: 18
    },
    c: ['Tom', 'Jerry'],
    d: new Date(),
    e: ' '
  }
})





