export interface WatchEvent {
  userId: string
  videoId: string
  timestamp: number
}

export interface JwtUser {
  sub: string
  iat?: number
  exp?: number
}

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtUser
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: JwtUser
    user: JwtUser
  }
} 