import dotenv from 'dotenv'
import { server } from '@/src/mocks/server'
import '@testing-library/jest-dom'

dotenv.config({ path: '.env' })
jest.mock('next/router', () => require('next-router-mock'))

beforeAll(() => server.listen())
beforeEach(() => {
  server.resetHandlers()
  jest.clearAllMocks()
})
afterAll(() => server.close())
