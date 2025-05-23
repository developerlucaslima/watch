'use client'
import { INITIAL_PUBLIC_PAGE } from '@constants/routes'
import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/features/auth/stores/use-auth-store'

import { signOut } from '../services/sign-out'

export function useSignOut() {
  const router = useRouter()
  const signOutStore = useAuthStore((s) => s.signOut)

  return async function handleSignOut() {
    await signOut()
    signOutStore()
    router.push(INITIAL_PUBLIC_PAGE)
  }
}
