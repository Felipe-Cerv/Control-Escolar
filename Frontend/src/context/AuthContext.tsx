import { createContext, useState, useEffect, ReactNode } from 'react'
import { LoginResponse } from '../api/auth.service'

type ApiUser = LoginResponse['data']['user']

interface AuthContextType {
    user: ApiUser | null
    token: string | null
    login: (token: string, user: ApiUser) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    login: () => { },
    logout: () => { }
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<ApiUser | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')

        if (storedToken && storedUser && storedUser !== 'undefined') {
            try {
                setToken(storedToken)
                setUser(JSON.parse(storedUser))
            } catch (e) {
                // Clear invalid data
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            }
        }
    }, [])

    const login = (token: string, user: ApiUser) => {
        setToken(token)
        setUser(user)

        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
