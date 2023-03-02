import { DefaultBodyType, rest } from 'msw'
import { apiClient } from '~/utils/apiClient'
import { mockAccount } from '$/mocks'
import { AxiosRequestConfig } from 'axios'

type Method = keyof typeof rest
type Status = number

const delayMs = process.env.NODE_ENV === 'test' ? 0 : 300

type CreateHandlerOption<Response> = Partial<{
  response: Response
  onRequest: () => unknown
}>
const createHandler = (path: string, method: Method, status: Status, options?: CreateHandlerOption<DefaultBodyType>) =>
  rest[method](path, (_, res, ctx) => {
    if (options?.onRequest) options.onRequest()
    return res(ctx.status(status), ctx.delay(delayMs), ctx.json(options?.response))
  })

export const getWith200 = <
  U extends { $path: () => string } & Record<'$get', (args: { config?: AxiosRequestConfig }) => unknown>,
>(
  path: U,
  options?: CreateHandlerOption<
    ReturnType<U['$get']> extends Promise<infer S> ? (S extends DefaultBodyType ? S : never) : never
  >,
) => createHandler(path.$path(), 'get', 200, options)
export const postWith201 = <
  U extends { $path: () => string } & Record<'$post', (args: Parameters<U['$post']>[0]) => unknown>,
>(
  path: U,
  options?: CreateHandlerOption<
    ReturnType<U['$post']> extends Promise<infer S> ? (S extends DefaultBodyType ? S : never) : never
  >,
) => createHandler(path.$path(), 'post', 201, options)
export const postWith204 = <
  U extends { $path: () => string } & Record<'$post', (args: Parameters<U['$post']>[0]) => unknown>,
>(
  path: U,
  options?: CreateHandlerOption<
    ReturnType<U['$post']> extends Promise<infer S> ? (S extends DefaultBodyType ? S : never) : never
  >,
) => createHandler(path.$path(), 'post', 204, options)
export const putWith200 = <
  U extends { $path: () => string } & Record<'$put', (args: Parameters<U['$put']>[0]) => unknown>,
>(
  path: U,
  options?: CreateHandlerOption<
    ReturnType<U['$put']> extends Promise<infer S> ? (S extends DefaultBodyType ? S : never) : never
  >,
) => createHandler(path.$path(), 'put', 200, options)

export const handlers = [
  getWith200(apiClient.authed.account.me, { response: mockAccount() }),
  postWith201(apiClient.public.account, { response: mockAccount() }),
  postWith204(apiClient.public.login),
]
