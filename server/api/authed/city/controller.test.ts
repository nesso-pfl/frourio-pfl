import { mockAccount, mockCity, mockCreateCity } from '$/mocks'
import { cityToResponse, CreateCityError, createCityToResponse } from '$/service/city'
import fastify from 'fastify'
import controller from './controller'

describe('GET authed/city', () => {
  test('町一覧が取得できたら 200 を返す', async () => {
    const returningData = {
      totalCount: 100,
      cities: [...Array(20).keys()].map((index) => mockCity({ id: index + 1 })),
    }
    const injectedController = controller.inject((deps) => ({
      listCities: deps.listCities.inject({
        getTotalCount: () => Promise.resolve(returningData.totalCount),
        findMany: () => Promise.resolve(returningData.cities),
      }),
    }))(fastify())

    const res = await injectedController.get({
      account: mockAccount(),
      query: undefined,
    })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject({ ...returningData, cities: returningData.cities.map(cityToResponse) })
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

  test('名前の重複エラーにより町の作成に失敗したら 400 を返す', async () => {
    const returningData = new CreateCityError('unique-name')
    const injectedController = controller.inject((deps) => ({
      createCity: deps.createCity.inject(() => ({ create: () => Promise.reject(returningData) })),
    }))(fastify())

    const res = await injectedController.post.handler({
      account: mockAccount(),
      body: createCityToResponse(mockCreateCity()),
    })

    expect(res.status).toBe(400)
    expect(res.body).toMatchObject(returningData)
  })

  test('名前（かな）の重複エラーにより町の作成に失敗したら 400 を返す', async () => {
    const returningData = new CreateCityError('unique-nameKana')
    const injectedController = controller.inject((deps) => ({
      createCity: deps.createCity.inject(() => ({ create: () => Promise.reject(returningData) })),
    }))(fastify())

    const res = await injectedController.post.handler({
      account: mockAccount(),
      body: createCityToResponse(mockCreateCity()),
    })

    expect(res.status).toBe(400)
    expect(res.body).toMatchObject(returningData)
  })
})
