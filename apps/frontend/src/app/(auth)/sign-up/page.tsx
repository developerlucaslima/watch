import { AuthHeader } from '@auth/components/auth-header'
import { SignUpForm } from '@auth/components/sign-up-form'
import { Loader } from '@components/ui/loader'
import { Suspense } from 'react'

export default function SignUp() {
  return (
    <div className="mx-auto flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <AuthHeader title="Cadastro Watch Brasil" />
        <Suspense fallback={<Loader text="Carregando..." />}>
          <SignUpForm />
        </Suspense>
      </div>
    </div>
  )
}
