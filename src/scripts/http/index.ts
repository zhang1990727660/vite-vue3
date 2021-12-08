import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios"

const http = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_PATH,
})

// 请求成功拦截
const requestHandle = (config: AxiosRequestConfig) => {
  return config
}
// 请求失败拦截
const requestErrHandle = (config: AxiosError) => {
  return config
}

// 请求响应拦截
const responseHandle = (res: AxiosResponse) => {
  return Promise.resolve([undefined, res?.data?.data])
}
// 请求响应失败拦截
const responseErrHandle = (err: AxiosError) => {
  return Promise.resolve([err, undefined])
}

http.interceptors.request.use(requestHandle, requestErrHandle)
http.interceptors.response.use(responseHandle, responseErrHandle)

export default http
