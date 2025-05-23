'use client'

import { signUp } from '@auth/services/sign-up'
import { useAuthStore } from '@auth/stores/use-auth-store'
import { type SignUpFormData, signUpSchema } from '@auth/types/sign-up'
import { INITIAL_PRIVATE_PAGE } from '@constants/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { getErrorMessage } from '@utils/get-error-message'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function useSignUp() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: userSignUpMutation } = useMutation({
    mutationFn: signUp,
  })

  async function handleSignUp(data: SignUpFormData) {
    try {
      const user = await userSignUpMutation(data)
      setUser(user)
      router.push(INITIAL_PRIVATE_PAGE)
    } catch (error: unknown) {
      toast.error(getErrorMessage(error))
    }
  }

  return {
    errors,
    register,
    handleSubmit,
    isSubmitting,
    handleSignUp,
  }
}
