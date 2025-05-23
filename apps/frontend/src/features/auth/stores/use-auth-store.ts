import type { User } from '@shared/types/user'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      signOut: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
    },
  ),
)
