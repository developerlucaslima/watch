import type { FastifyInstance } from 'fastify'
import { signUpController } from '../controllers/sign-up.controller'
import { signInController } from '../controllers/sign-in.controller'
import { signOutController } from '../controllers/sign-out.controller'
import { refreshTokenController } from '../controllers/refresh-token-controller'


export async function authRoutes(app: FastifyInstance) {
  /** Authenticate */
  app.post('/sign-up', signUpController)
  app.post('/sign-in', signInController)
  app.post('/sign-out', signOutController)

  /** Token Refresh */
  app.patch('/refresh-token', refreshTokenController)
}
