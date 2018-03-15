import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://cnodejs.org', // 因为我本地做了反向代理
  timeout: 10000,
  responseType: 'json'
  // withCredentials: true // 是否允许带cookie这些
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // }
})

instance.installed = false

// POST传参序列化(添加请求拦截器,可选)
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (config.method === 'get') {
      config.params = config.data
    }
    // 若是有做鉴权token , 就给头部带上token
    if (window.localStorage.token) {
      config.headers.Authorization = window.localStorage.token
    }
    return config
  },
  error => {
    window.alert('请求错误!')
    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断(添加响应拦截器,可选)
instance.interceptors.response.use(
  res => {
    var response = res.data
    var config = res.config
    if (response && typeof response !== 'object') {
      console.info('返回类型错误:' + response)
      return Promise.reject(response)
    } else if (response && (response.responseCode === '000000' || response.code === '0000000' || response.success === true)) {
      return Promise.resolve(res.data)
    } else {
      let errMsg = response.responseMsg || response.responseCode || '接口错误'
      console.info('接口返回错误:', errMsg)
      console.group('接口报错详情:')
      console.log('api地址:')
      console.info(config.url)
      console.log('api接口入参:')
      console.table(config.params)
      console.log('api接口返回:')
      console.table(response)
      console.groupEnd()
      return Promise.reject(errMsg)
    }
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    // if (!window.localStorage.getItem('loginUserBaseInfo')) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   // router.push({
    //   //   path: '/login'
    //   // })
    //   window.alert('跳转登录')
    // } else {
    //   // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
    //   // 乖乖的返回去登录页重新登录
    //   let lifeTime =
    //     JSON.parse(window.localStorage.getItem('loginUserBaseInfo')).lifeTime *
    //     1000
    //   let nowTime = (new Date()).getTime() // 当前时间的时间戳
    //   if (nowTime > lifeTime) {
    //     // Message({
    //     //   showClose: true,
    //     //   message: '登录状态信息过期,请重新登录',
    //     //   type: 'error'
    //     // })
    //     // router.push({
    //     //   path: '/login'
    //     // })
    //     window.alert('登录状态信息过期，请重新登录')
    //     // window.location.href = 'https://baidu.com'
    //   }
    // }
    let status = error.response.status
    if (!error.response) {
      window.alert(error)
      return Promise.reject(error.message)
    }
    // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
    if (status === 403) {
      window.alert('错误状态:' + status)
    } else if (status === 500) {
      window.alert('错误状态:' + status)
    } else if (status === 502) {
      window.alert('错误状态:' + status)
    } else if (status === 404) {
      window.alert('错误状态:' + status)
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data.error_msg)
  }
)

function createAPI (baseURL) {
  return function (conf) {
    conf = conf || {}
    return instance(Object.assign({}, {
      url: conf.url,
      baseURL: baseURL,
      method: conf.method,
      timeout: 10000
    }, conf.opts))
  }
}

function convertRESTAPI (url, opts) {
  if (!opts || !opts.path) return url
  const pathKeys = Object.keys(opts.path)
  pathKeys.forEach((key) => {
    const r = new RegExp('(:' + key + '|{' + key + '})', 'g')
    url = url.replace(r, opts.path[key])
  })
  return url
}

function Axios (Vue, Option) {
  if (instance.installed) {
    return
  }
  Object.defineProperty(Vue.prototype, '$http', { value: instance })
  instance.installed = true
}

export {
  createAPI,
  convertRESTAPI,
  Axios
}
