import aspida from '@aspida/axios'
import api from '$/api/$api'
import axios from 'axios'

export const apiClient = api(aspida(axios, { withCredentials: process.env.NODE_ENV !== 'test' }))
