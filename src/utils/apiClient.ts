import aspida from '@aspida/axios'
import api from '$/api/$api'
import axios, { AxiosError } from 'axios'
import { getIdToken } from '../lib/firebase'

const axiosInstance = axios.create({
  withCredentials: process.env.NODE_ENV !== 'test',
})
export const apiClient = api(aspida(axiosInstance))

axiosInstance.interceptors.response.use(
  (response) => response,
  // 401 エラー時、Firebase の id token によって再認証が可能なら再認証する
  async (error: AxiosError) => {
    if (error.response?.status !== 401 || error.request.responseURL === apiClient.authed.account.me.$path()) throw error

    const firebaseIdToken = await getIdToken()
    if (!firebaseIdToken) throw error

    await apiClient.public.login.$post({ body: { firebaseIdToken } })
    return await axiosInstance.request(error.config)
  },
)
