import path from 'path'
import Fastify, { FastifyServerFactory } from 'fastify'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import fastifyStatic from '@fastify/static'
import { API_BASE_PATH, API_COOKIE_SECRET, API_UPLOAD_DIR, CLIENT_ORIGIN } from '$/service/envValues'
import server from '$/$server'

export const init = (serverFactory?: FastifyServerFactory) => {
  const app = Fastify({ serverFactory })
  app.register(helmet, { crossOriginResourcePolicy: false })
  app.register(cors, { origin: CLIENT_ORIGIN, credentials: true })
  app.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/',
  })
  if (API_UPLOAD_DIR) {
    app.after(() => {
      app.register(fastifyStatic, {
        root: path.resolve(__dirname, API_UPLOAD_DIR),
        prefix: '/upload/',
        decorateReply: false,
      })
    })
  }
  app.register(cookie, {
    secret: API_COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      path: '/',
      sameSite: 'lax',
    },
  })
  server(app, { basePath: API_BASE_PATH })
  return app
}
