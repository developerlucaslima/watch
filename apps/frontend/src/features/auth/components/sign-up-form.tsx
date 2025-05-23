'use client'

import { useSignUp } from '@auth/hooks/use-sign-up'
import { ErrorMessage } from '@components/ui/error-message'
import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { AuthFooter } from './auth-footer'

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSignUp, handleSubmit, isSubmitting, register, errors } =
    useSignUp()

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 px-6">
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" type="text" {...register('name')} />
            <ErrorMessage error={errors.name?.message} />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
            <ErrorMessage error={errors.email?.message} />
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Senha</Label>
            <div className="flex gap-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="flex-grow"
              />
              <Button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                size="icon"
                variant="ghost"
              >
                {showPassword ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeClosed className="h-4 w-4" />
                )}
              </Button>
            </div>
            <ErrorMessage error={errors.password?.message} />
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full">
            Criar conta e entrar
          </Button>
        </form>

        <Separator className="my-4" />

        <AuthFooter
          linkHref="/sign-in"
          question="Já tem uma conta?"
          linkText="Entrar"
        />
      </CardContent>
    </Card>
  )
}
