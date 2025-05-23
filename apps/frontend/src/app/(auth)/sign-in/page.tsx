import { AuthHeader } from '@auth/components/auth-header'
import { Loader } from '@components/ui/loader'
import { Suspense } from 'react'

import { SignInForm } from '@/features/auth/components/sign-in-form'

export default function SignIn() {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader title="Acessar Watch Brasil" />
        <Suspense fallback={<Loader text="Carregando..." />}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  )
}
