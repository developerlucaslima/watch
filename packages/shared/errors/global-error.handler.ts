import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { BaseException } from './base.exception'

export function globalErrorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const origin = request.headers.origin ?? '*'

  reply
    .header('Access-Control-Allow-Origin', origin)
    .header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    .header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
    .header('Access-Control-Allow-Credentials', 'true')

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.errors,
    })
  }

  if (error instanceof BaseException) {
    return reply.status(error.code).send({ message: error.message } as never)
  }

  request.log.error(error, 'Unhandled Error')
  return reply.status(500).send({ message: 'Internal server error.' })
}
