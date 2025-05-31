import { create } from 'zustand'

interface AuthState {
    isAuthenticated: boolean
    userId: string | null
    token: string | null
    login: (userId: string, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    userId: null,
    token: null,

    login: (userId, token) => set({
        isAuthenticated: true,
        userId,
        token,
    }),

    logout: () => set({
        isAuthenticated: false,
        userId: null,
        token: null,
    }),
}))
