'use client'

import { INITIAL_PRIVATE_PAGE } from '@constants/routes'
import { useMutation } from '@tanstack/react-query'
import { getErrorMessage } from '@utils/get-error-message'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { signIn } from '../services/sign-in'
import { useAuthStore } from '../stores/use-auth-store'
import type { SignInFormData } from '../types/sing-in'

export function useSignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: playerSignInMutation } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInFormData) {
    try {
      const player = await playerSignInMutation(data)
      setUser(player)
      router.push(INITIAL_PRIVATE_PAGE)
    } catch (error: unknown) {
      toast.error(getErrorMessage(error))
    }
  }

  return {
    register,
    handleSubmit,
    isSubmitting,
    handleSignIn,
  }
}
