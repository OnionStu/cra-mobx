import axios from 'axios'

// 请求数
const reqNums = []
// 显示loading
const showLoading = () => {
  if (0 === reqNums.length) console.log('loading!')
  reqNums.push(reqNums.length)
}
// 隐藏loading
const hideLoading = () => {
  reqNums.shift()
  if (0 === reqNums.length) console.log('close loading!')
}
// axios 配置
axios.defaults.timeout = 6000
axios.defaults.showLoading = true
axios.defaults.baseURL = '/api/'

// request 拦截器
axios.interceptors.request.use(
  config => {
    config.showLoading && showLoading()
    return config
  },
  err => {
    hideLoading()
    return Promise.reject(err)
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    hideLoading()
    console.warn(response)
    return response.data
  },
  error => {
    console.error(error)
    hideLoading()
    return Promise.reject(error)
  }
)

export default axios
