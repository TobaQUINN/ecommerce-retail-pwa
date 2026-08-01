import { create } from 'zustand'
import type { Admin } from '@/types'

interface AuthState {
  admin: Admin | null
  isAuthenticated: boolean
  isLoading: boolean
  setAdmin: (admin: Admin | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  admin: null,
  isAuthenticated: false,
  isLoading: true,

  setAdmin: (admin) =>
    set({ admin, isAuthenticated: !!admin, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => set({ admin: null, isAuthenticated: false }),
}))
