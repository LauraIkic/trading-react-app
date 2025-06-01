import { create } from 'zustand'

interface AuthState {
    isAuthenticated: boolean
    userId: string | null
    token: string | null
    login: (userId: string, token: string) => void
    logout: () => void
}

const getSession = () => {
    if (typeof window === 'undefined') return null
    const stored = sessionStorage.getItem('auth')
    return stored ? JSON.parse(stored) : null
}

export const useAuthStore = create<AuthState>((set, get) => {
    const session = getSession()

    return {
        isAuthenticated: session?.isAuthenticated ?? false,
        userId: session?.userId ?? null,
        token: session?.token ?? null,

        login: (userId, token) => {
            set({
                isAuthenticated: true,
                userId: userId,
                token: token,
            })

            sessionStorage.setItem(
                'auth',
                JSON.stringify({
                    isAuthenticated: true,
                    userId: userId,
                    token: token,
                })
            )
        },

        logout: () => {
            set({
                isAuthenticated: false,
                userId: null,
                token: null,
            })
            sessionStorage.removeItem('auth')
        },
    }
})
