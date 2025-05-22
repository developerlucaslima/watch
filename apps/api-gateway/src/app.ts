import { builder } from './builder'
import { env } from './env'

const startApp = async () => {
  const app = builder()
  try {
    await app.listen({ host: '0.0.0.0', port: env.PORT }).then(() => {
      console.log(`🚀 HTTP server running on port ${env.PORT}`)
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

startApp()
