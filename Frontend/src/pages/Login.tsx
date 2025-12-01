import { useState } from 'react'
import { loginRequest } from '../api/auth.service'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await loginRequest(email, password)
            if (!res || !res.ok) throw new Error('Login failed')

            const token = res.data.token
            const user = res.data.user

            login(token, user)

            let destination = '/'
            try {
                const payload = JSON.parse(atob(token.split('.')[1]))
                const roles = payload?.roles
                if (Array.isArray(roles)) {
                    const flat: any[] = roles.flatMap((inner: any) => Array.isArray(inner) ? inner : [inner])
                    const hasAdmin = flat.some(r => r?.rol_id === 1)
                    const hasMaestro = flat.some(r => r?.rol_id === 2)
                    if (hasAdmin) destination = '/admin'
                    else if (hasMaestro) destination = '/maestro'
                    else destination = '/'
                }
            } catch (e) {
            }

            navigate(destination)
        } catch (err: any) {
            console.error(err)
            let errorMessage = 'Error al iniciar sesión'

            if (err?.response?.data) {
                const data = err.response.data
                if (data.details && Array.isArray(data.details) && data.details.length > 0) {
                    errorMessage = data.details.map((d: any) => d.message).join(', ')
                } else if (data.error) {
                    errorMessage = data.error
                } else if (data.message) {
                    errorMessage = data.message
                }
            }

            setError(errorMessage)
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-3xl p-10 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Control Escolar</h1>
                    <p className="text-gray-500">Inicia sesión para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-gray-400"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-gray-400"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl transition font-semibold shadow-md hover:shadow-lg"
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </button>
                </form>
            </div>
        </div>
    )
}
