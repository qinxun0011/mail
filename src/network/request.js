import axios from "axios";
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://xxxx',
    timeout: 5000
  })
  //axios的拦截器
  //拦截请求
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  //拦截响应
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config);
}
