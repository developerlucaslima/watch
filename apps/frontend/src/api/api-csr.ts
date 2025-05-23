import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'

import { clientEnv } from '@/env/client-env'
import { signOut } from '@/features/auth/services/sign-out'
import { useAuthStore } from '@/features/auth/stores/use-auth-store'

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    __isRetryRequest?: boolean
  }
}

const apiClientSide = axios.create({
  baseURL: clientEnv.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

async function handleSessionExpired() {
  await signOut()
  useAuthStore.getState().signOut()
  if (typeof window !== 'undefined') {
    toast.error('Sessão expirada. Faça login novamente.')
  }
}

apiClientSide.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig

    if (!error.response) {
      if (typeof window !== 'undefined') {
        toast.error('Erro de conexão com o servidor.')
      }
      return Promise.reject(error)
    }

    if (error.response.status === 401 && !originalRequest.__isRetryRequest) {
      try {
        originalRequest.__isRetryRequest = true
        await apiClientSide.patch('/token/user-refresh')
        return apiClientSide(originalRequest)
      } catch (refreshError) {
        await handleSessionExpired()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export { apiClientSide }
