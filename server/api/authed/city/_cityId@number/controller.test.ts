import { mockCity, mockUpdateCity } from '$/mocks'
import { mockAccount } from '$/mocks'
import { cityToResponse, updateCityToResponse } from '$/service/city'
import fastify from 'fastify'
import controller from './controller'

describe('GET authed/city/_cityId@number', () => {
  test('町が取得できたら 200 を返す', async () => {
    const returningData = mockCity()
    const injectedController = controller.inject((deps) => ({
      findCity: deps.findCity.inject({
        find: () => Promise.resolve(returningData),
      }),
    }))(fastify())

    const res = await injectedController.get({
      account: mockAccount(),
      params: { cityId: 1 },
    })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(cityToResponse(returningData))
  })

  test('町が見つからなかったら 404 を返す', async () => {
    const injectedController = controller.inject((deps) => ({
      findCity: deps.findCity.inject({
        find: () => Promise.resolve(undefined),
      }),
    }))(fastify())

    const res = await injectedController.get({
      account: mockAccount(),
      params: { cityId: 1 },
    })

    expect(res.status).toBe(404)
  })
})

describe('PUT authed/city/_cityId@number', () => {
  test('町が更新できたら 200 を返す', async () => {
    const returningData = mockCity()
    const injectedController = controller.inject((deps) => ({
      updateCity: deps.updateCity.inject({
        update: () => Promise.resolve(returningData),
      }),
    }))(fastify())

    const res = await injectedController.put({
      account: mockAccount(),
      params: { cityId: 1 },
      body: updateCityToResponse(mockUpdateCity()),
    })

    expect(res.status).toBe(200)
    expect(res.body).toMatchObject(cityToResponse(returningData))
  })
})

describe('DELETE authed/city/_cityId@number', () => {
  test('町が削除できたら 204 を返す', async () => {
    const injectedController = controller.inject((deps) => ({
      deleteCity: deps.deleteCity.inject({
        delete_: () => Promise.resolve(),
      }),
    }))(fastify())

    const res = await injectedController.delete({
      account: mockAccount(),
      params: { cityId: 1 },
    })

    expect(res.status).toBe(204)
  })
})
