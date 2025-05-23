'use client'

import { Eye, EyeClosed } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { useSignIn } from '../hooks/use-sign-in'
import { AuthFooter } from './auth-footer'

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleSignIn, handleSubmit, isSubmitting, register } = useSignIn()

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 px-6">
        <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register('email')} />
          </div>

          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <div className="text-xs">
                <a
                  href="#"
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
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
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <Separator className="my-4" />
        <AuthFooter
          linkHref="/sign-up"
          question="Novo por aqui?"
          linkText="Crie sua conta"
        />
      </CardContent>
    </Card>
  )
}
