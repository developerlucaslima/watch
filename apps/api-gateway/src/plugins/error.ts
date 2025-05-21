import type { FastifyInstance } from 'fastify'

import { globalErrorHandler } from '@errors/global-error-handler'

export function routesRegister(app: FastifyInstance) {
  app.setErrorHandler(globalErrorHandler)
}
