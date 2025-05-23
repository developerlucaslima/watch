import { globalErrorHandler } from '@shared/errors/global-error.handler'
import type { FastifyInstance } from 'fastify'

export function errorsRegister(app: FastifyInstance) {
  app.setErrorHandler(globalErrorHandler)
}
