/* import axios from 'axios'

//根域名配置 超时时间
const request = axios.create({
  baseURL: '',
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export { request } */