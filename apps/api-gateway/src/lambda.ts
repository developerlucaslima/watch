import serverless from '@fastify/aws-lambda'
import { builder } from 'builder'

const app = builder()

export const handler = serverless(app)
