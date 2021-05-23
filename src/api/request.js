import Axios from 'axios'
import config from '@/config'
// import store from '@/store'
// import router from '@/router'
import { DataModel, ListModel } from '@/models'
// import { getToken } from './user'
// import i18n from '../plugins/i18n'
// const lang = i18n.getLocale()
// const i18nMsg = i18n.messages[lang]

export const LoadingModels = {}

export const axiosInstance = (param) => {
  const ops = param || {}
  const axios = Axios.create({
    baseURL: `${config.api.baseUrl}`,
    headers: {
      'X-Client-Version': config.version,
    },
    ...ops.config,
  })
  const requestSuccess = (req) => {
    // LoadingModels 紀錄
    LoadingModels[`${req.method}:${req.baseURL}${req.url}`] = ops.promiseResult
    // Token 檢查系統
    if (sessionStorage.getItem('token')) {
      const token = JSON.parse(localStorage.getItem('token'))
      if (token) {
        req.headers.Authorization = `${token}`
        // req.headers['Authorization-type'] = 'refresh'
        // req.headers.Language = lang
      }
    }
    if (ops.model instanceof DataModel || ops.model instanceof ListModel) {
      req.model = ops.model
    }
    return req
  }
  const requesError = (err) => {
    return Promise.reject(err)
  }
  const responseSuccess = (res) => {
    LoadingModels[`${res.config.method}:${res.config.baseURL}${res.config.url}`] = null
    return res
  }
  const responseError = (err) => {
    const res = err.response
    // LoadingModels 重設
    LoadingModels[`${res.config.method}:${res.config.baseUrl}${res.config.url}`] = null
    // Token 檢查系統
    if (res.data.message === 'Unauthenticated') {
      // 採用第二組 Token
    }
    return ops.reject(err)
  }
  axios.interceptors.request.use(requestSuccess, requesError)
  axios.interceptors.response.use(responseSuccess, responseError)
  const AxiosRequest = function (...args) {
    return axios(...args)
  }
  Object.keys(axios).forEach((on) => {
    if (typeof axios[on] === 'function') {
      AxiosRequest[on] = async (...args) => {
        const promiseResult = axios[on](...args)
        ops.promiseResult = promiseResult
        return await new Promise((resolve, reject) => {
          ops.resolve = resolve
          ops.reject = reject
          promiseResult.then(resolve).catch(reject)
        })
      }
    }
  })
  return AxiosRequest
}

/**
 * @example
 * axiosRequest(options).method(url, data)
 */
export const request = axiosInstance()
