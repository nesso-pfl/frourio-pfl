import { mockAccount, mockCity, mockCreateCity } from '$/mocks'
import { cityToResponse, createCityToResponse } from '$/service/city'
import fastify from 'fastify'
import controller from './controller'

describe('GET authed/city', () => {
  test('町一覧が取得できたら 200 を返す', async () => {
    const returningData = [...Array(20).keys()].map((index) => mockCity({ id: index + 1 }))
    const injectedController = controller.inject((deps) => ({
      listCities: deps.listCities.inject({
        findMany: () => Promise.resolve(returningData),
      }),
    }))(fastify())

    const res = await injectedController.get({
      account: mockAccount(),
      query: undefined,
    })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ cities: returningData.map(cityToResponse) })
  })
})

describe('POST authed/city', () => {
  test('町が作成できたら 201 を返す', async () => {
    const returningData = mockCity()
    const injectedController = controller.inject((deps) => ({
      createCity: deps.createCity.inject(() => ({ create: () => Promise.resolve(returningData) })),
    }))(fastify())

    const res = await injectedController.post.handler({
      account: mockAccount(),
      body: createCityToResponse(mockCreateCity()),
    })

    expect(res.status).toBe(201)
    expect(res.body).toMatchObject(cityToResponse(returningData))
  })
})
