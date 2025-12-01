export interface AuthUser {
    id?: string
    name?: string
    email?: string
}

export interface AuthContextValue {
    user: AuthUser | null
    token?: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}
