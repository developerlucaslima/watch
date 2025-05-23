import { AxiosError } from 'axios'

export type ApiErrorResponse = {
  message: string
}

export function getErrorMessage(error: unknown): string {
  if (isAxiosErrorWithMessage(error)) {
    return error.response?.data?.message || 'Erro inesperado na requisição.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Ocorreu um erro desconhecido.'
}

function isAxiosErrorWithMessage(
  error: unknown,
): error is AxiosError<ApiErrorResponse> {
  return (
    typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error &&
    (error as AxiosError).isAxiosError === true
  )
}
