import React, { useState } from 'react'
import adminService from '../../../api/admin.service'
import Loader from '../../../components/common/Loader'

export default function CalificacionesAlumno() {
    const [matricula, setMatricula] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [calificaciones, setCalificaciones] = useState<any[]>([])
    const [alumno, setAlumno] = useState<{
        nombre: string
        matricula: string
        grupo: string
    } | null>(null)
    const promedioAlumno = calificaciones.length
        ? calificaciones.reduce((sum: number, c: any) => sum + (parseFloat(c.nota) || 0), 0) / calificaciones.length
        : 0

    const handleBuscar = async () => {
        if (!matricula.trim()) {
            setError('Ingresa una matrícula válida')
            return
        }
        setLoading(true)
        setError('')
        try {
            const data = await adminService.getAlumnoPorMatricula(matricula)
            setAlumno({ nombre: data.nombre, matricula: data.matricula, grupo: data.grupo })
            setCalificaciones(data.calificaciones)
        } catch (e: any) {
            const apiMsg = e?.response?.data?.error || e?.response?.data?.message
            setError(apiMsg || e.message || 'Error al obtener calificaciones')
            setAlumno(null)
            setCalificaciones([])
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Calificaciones de Alumno</h2>
                <p className="text-gray-600 text-sm">Busca por matrícula para ver todas las calificaciones del alumno.</p>
            </header>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4 relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                        <Loader />
                    </div>
                )}
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Matrícula (ej. A0001)"
                        value={matricula}
                        onChange={(e) => setMatricula(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                    />
                    <button
                        onClick={handleBuscar}
                        disabled={loading}
                        className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold shadow"
                    >
                        {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}
                {alumno && (
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 flex items-center justify-between">
                        <div className="space-y-0.5">
                            <div><span className="font-semibold">Alumno:</span> {alumno.nombre}</div>
                            <div><span className="font-semibold">Matrícula:</span> {alumno.matricula}</div>
                            <div><span className="font-semibold">Grupo:</span> {alumno.grupo}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-gray-500">Promedio del alumno</div>
                            <div className="text-lg font-semibold text-indigo-700">{promedioAlumno.toFixed(2)}</div>
                        </div>
                    </div>
                )}

                {calificaciones.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-2 text-center">Código</th>
                                    <th className="p-2 text-center">Materia</th>
                                    <th className="p-2 text-center">Nota</th>
                                    <th className="p-2 text-center">Maestro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calificaciones.map((c, i) => (
                                    <tr key={i} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="p-2 font-mono text-xs">{c.codigo}</td>
                                        <td className="p-2">{c.materia}</td>
                                        <td className="p-2 font-semibold">{c.nota}</td>
                                        <td className="p-2">{c.maestro}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">Ingresa una matrícula y pulsa "Buscar"</p>
                )}
            </div>
        </div>
    )
}
