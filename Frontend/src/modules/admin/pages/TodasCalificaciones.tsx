import React, { useEffect, useState } from 'react'
import adminService from '../../../api/admin.service'
import Loader from '../../../components/common/Loader'

export default function TodasCalificaciones() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [calificaciones, setCalificaciones] = useState<any[]>([])
    const [sortBy, setSortBy] = useState<'nombre' | 'promedio' | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const handleSort = (field: 'nombre' | 'promedio') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const sortedCalificaciones = [...calificaciones].sort((a, b) => {
        if (!sortBy) return 0
        
        let comparison = 0
        if (sortBy === 'nombre') {
            comparison = a.nombre.localeCompare(b.nombre)
        } else if (sortBy === 'promedio') {
            comparison = parseFloat(a.promedio) - parseFloat(b.promedio)
        }
        
        return sortOrder === 'asc' ? comparison : -comparison
    })

    const promedioTotal = calificaciones.length
        ? calificaciones.reduce((sum, c) => sum + (Number(c.promedio) || 0), 0) / calificaciones.length
        : 0

    useEffect(() => {
        fetchTodas()
    }, [])

    const fetchTodas = async () => {
        setLoading(true)
        setError('')
        try {
            const data = await adminService.getPromediosGenerales(1);
            setCalificaciones(data)
        } catch (e: any) {
            setError(e.message || 'Error al cargar calificaciones')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Promedios por alumnos</h2>
                    <p className="text-gray-600 text-sm">Vista de promedios individuales.</p>
                </div>
                <button
                    onClick={fetchTodas}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold shadow text-sm"
                >
                    {loading ? 'Cargando...' : 'Actualizar'}
                </button>
            </header>

            {error && (
                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {error}
                </div>
            )}

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                        <Loader />
                    </div>
                )}
                {calificaciones.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-2 text-center">Matrícula</th>
                                    <th className="p-2 text-center">
                                        <button 
                                            onClick={() => handleSort('nombre')} 
                                            className="flex items-center justify-center gap-1 w-full hover:text-indigo-600 transition-colors"
                                        >
                                            Alumno
                                            {sortBy === 'nombre' && (
                                                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-2 text-center">
                                        <button 
                                            onClick={() => handleSort('promedio')} 
                                            className="flex items-center justify-center gap-1 w-full hover:text-indigo-600 transition-colors"
                                        >
                                            Promedio <span className="font-normal text-xs text-gray-500">(Total: {promedioTotal.toFixed(2)})</span>
                                            {sortBy === 'promedio' && (
                                                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedCalificaciones.map((c, i) => (
                                    <tr key={i} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="p-2 font-mono text-xs">{c.matricula}</td>
                                        <td className="p-2">{c.nombre}</td>
                                        <td className="p-2 font-semibold">{c.promedio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">
                        {loading ? 'Cargando...' : 'No hay calificaciones disponibles'}
                    </p>
                )}
            </div>
        </div>
    )
}
