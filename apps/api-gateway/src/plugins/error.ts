import { globalErrorHandler } from '@shared/errors/global-error.handler'
import type { FastifyInstance } from 'fastify'


export function routesRegister(app: FastifyInstance) {
  app.setErrorHandler(globalErrorHandler)
}
