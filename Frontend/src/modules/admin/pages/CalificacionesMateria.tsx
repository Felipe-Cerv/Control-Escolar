import React, { useState, useEffect } from 'react'
import adminService, { Materia } from '../../../api/admin.service'
import Loader from '../../../components/common/Loader'

export default function CalificacionesMateria() {
    const [materias, setMaterias] = useState<Materia[]>([])
    const [selectedMaterias, setSelectedMaterias] = useState<number[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [calificaciones, setCalificaciones] = useState<any[]>([])

    useEffect(() => {
        const loadMaterias = async () => {
            try {
                const data = await adminService.getMaterias()
                setMaterias(data)
            } catch (e: any) {
                setError('Error al cargar materias: ' + e.message)
            }
        }
        loadMaterias()
    }, [])

    const handleToggleMateria = (materiaId: number) => {
        setSelectedMaterias(prev =>
            prev.includes(materiaId)
                ? prev.filter(id => id !== materiaId)
                : [...prev, materiaId]
        )
    }

    const handleBuscar = async () => {
        if (selectedMaterias.length === 0) {
            setError('Selecciona al menos una materia')
            return
        }
        setLoading(true)
        setError('')
        try {
            const data = await adminService.getCalificacionesPorMateria(selectedMaterias)
            setCalificaciones(data)
        } catch (e: any) {
            setError(e.message || 'Error al obtener calificaciones')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Calificaciones por Materia</h2>
                <p className="text-gray-600 text-sm">Selecciona una o más materias para ver los promedios de cada materia.</p>
            </header>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-4 relative">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                        <Loader />
                    </div>
                )}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Selecciona Materias</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50">
                        {materias.map((materia) => (
                            <label
                                key={materia.materia_id}
                                className="flex items-center gap-2 p-3 rounded-lg hover:bg-white border border-transparent hover:border-indigo-200 cursor-pointer transition"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedMaterias.includes(materia.materia_id)}
                                    onChange={() => handleToggleMateria(materia.materia_id)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {materia.codigo} - {materia.nombre}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                            {selectedMaterias.length} materia(s) seleccionada(s)
                        </span>
                        <button
                            onClick={handleBuscar}
                            disabled={loading || selectedMaterias.length === 0}
                            className="px-6 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold shadow"
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm">
                        {error}
                    </div>
                )}

                {calificaciones.length > 0 ? (
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-2 text-center">Código</th>
                                    <th className="p-2 text-center">Nombre</th>
                                    <th className="p-2 text-center">Total de Alumnos</th>
                                    <th className="p-2 text-center">Promedio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {calificaciones.map((c, i) => (
                                    <tr key={i} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="p-2">{c.codigo}</td>
                                        <td className="p-2 font-mono text-xs">{c.nombre}</td>
                                        <td className="p-2 font-semibold">{c.total_alumnos}</td>
                                        <td className="p-2">{c.promedio}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-8">Selecciona una materia y pulsa "Buscar"</p>
                )}
            </div>
        </div>
    )
}
