import { refreshTokenController } from '@auth/controllers/refresh-token-controller'
import { signInController } from '@auth/controllers/sign-in.controller'
import { signOutController } from '@auth/controllers/sign-out.controller'
import { signUpController } from '@auth/controllers/sign-up.controller'
import type { FastifyInstance } from 'fastify'

export async function authRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpController)
  app.post('/sign-in', signInController)
  app.post('/sign-out', signOutController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)
}
