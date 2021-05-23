import { request } from './request'

export const login = (data) => request.post('login', data)
export const getUser = () => request.get('user')
export const getToken = () => request.get('token')
