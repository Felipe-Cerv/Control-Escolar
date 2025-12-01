import React, { useEffect, useState } from 'react'
import { maestroService } from '../../../api/maestro.service'
import Loader from '../../../components/common/Loader'

export default function DashboardMaestro() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [reporte, setReporte] = useState<Array<{
        calificacion_id: number
        matricula: string
        alumno: string
        materia: string
        grupo: string
        nota: number
        observaciones: string
    }>>([])
    const [gruposCount, setGruposCount] = useState(0)
    const [materiasCount, setMateriasCount] = useState(0)
    const [grupos, setGrupos] = useState<Array<{ grupo_id: number; descripcion: string }>>([])
    const [materias, setMaterias] = useState<Array<{ materia_id: number; codigo: string; nombre: string }>>([])

    const [editRow, setEditRow] = useState<null | { index: number; calificacion_id: number; matricula: string; nota: number | string; observaciones: string }>(null)
    const [sortBy, setSortBy] = useState<'grupo' | 'alumno' | 'nota' | null>(null)
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

    const handleSort = (field: 'grupo' | 'alumno' | 'nota') => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }

    const sortedReporte = [...reporte].sort((a, b) => {
        if (!sortBy) return 0

        let comparison = 0
        if (sortBy === 'grupo') {
            comparison = a.grupo.localeCompare(b.grupo)
        } else if (sortBy === 'alumno') {
            comparison = a.alumno.localeCompare(b.alumno)
        } else if (sortBy === 'nota') {
            comparison = a.nota - b.nota
        }

        return sortOrder === 'asc' ? comparison : -comparison
    })

    const loadData = async () => {
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const maestroId = 1
            const [reporteData, gruposData, materiasData] = await Promise.all([
                maestroService.getReporte(),
                maestroService.getGruposMaestro(maestroId),
                maestroService.getMaterias(maestroId)
            ])
            setReporte(reporteData)
            setGruposCount(gruposData.length)
            setMateriasCount(materiasData.length)
            setGrupos(gruposData)
            setMaterias(materiasData)
        } catch (e: any) {
            setError(e?.response?.data?.error || e.message || 'Error al cargar datos')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const startEdit = (row: typeof reporte[0], index: number) => {
        setEditRow({ index, calificacion_id: row.calificacion_id, matricula: row.matricula, nota: row.nota, observaciones: row.observaciones || '' })
    }

    const cancelEdit = () => setEditRow(null)

    const saveEdit = async () => {
        if (!editRow) return

        const notaStr = String(editRow.nota).trim()
        if (!notaStr || !/^\d{1,2}(\.\d+)?$/.test(notaStr)) {
            setError('La nota debe tener máximo 2 dígitos antes del punto decimal')
            return
        }
        const notaNum = parseFloat(notaStr)
        if (isNaN(notaNum) || notaNum < 0 || notaNum > 10) {
            setError('La nota debe estar entre 0 y 10')
            return
        }

        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const response = await maestroService.actualizarCalificacion({
                calificacion_id: editRow.calificacion_id,
                nueva_nota: notaNum,
                observaciones: editRow.observaciones.trim() === '' ? null : editRow.observaciones
            })
            if (response?.ok) {
                setReporte(prev => prev.map((r, i) => i === editRow.index ? { ...r, nota: notaNum, observaciones: editRow.observaciones } : r))
                setSuccess('Calificación actualizada con éxito')
                setEditRow(null)
                setTimeout(() => setSuccess(''), 3000)
            } else {
                setError('Error al actualizar la calificación')
            }
        } catch (e: any) {
            setError(e?.response?.data?.error || e.message || 'Error al guardar calificación')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Panel de control de Maestro</h2>
                </div>
                <button
                    onClick={loadData}
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold flex items-center gap-2 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Actualizar
                </button>
            </header>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-600">Resumen del maestro</h3>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Grupos asignados</h3>
                            <div className="text-2xl font-bold text-indigo-700">{gruposCount}</div>
                        </div>
                        {grupos.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {grupos.map((g) => (
                                    <span key={g.grupo_id} className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-700 rounded-md">
                                        {g.descripcion}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="text-sm font-semibold text-gray-700">Materias asignadas</h3>
                            <div className="text-2xl font-bold text-indigo-700">{materiasCount}</div>
                        </div>
                        {materias.length > 0 && (
                            <div className="space-y-1.5">
                                {materias.map((m) => (
                                    <div key={m.materia_id} className="flex items-center gap-2 text-xs">
                                        <span className="font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{m.codigo}</span>
                                        <span className="text-gray-700">{m.nombre}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-200 relative">
                    {loading && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                            <Loader />
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded-xl text-sm mb-4">
                            {success}
                        </div>
                    )}

                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700">
                                    <th className="p-2 text-center">Matrícula</th>
                                    <th className="p-2 text-center">
                                        <button
                                            onClick={() => handleSort('alumno')}
                                            className="flex items-center justify-center gap-1 w-full hover:text-indigo-600 transition-colors"
                                        >
                                            Alumno
                                            {sortBy === 'alumno' && (
                                                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-2 text-center">Materia</th>
                                    <th className="p-2 text-center">
                                        <button
                                            onClick={() => handleSort('grupo')}
                                            className="flex items-center justify-center gap-1 w-full hover:text-indigo-600 transition-colors"
                                        >
                                            Grupo
                                            {sortBy === 'grupo' && (
                                                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-2 text-center">
                                        <button
                                            onClick={() => handleSort('nota')}
                                            className="flex items-center justify-center gap-1 w-full hover:text-indigo-600 transition-colors"
                                        >
                                            Nota
                                            {sortBy === 'nota' && (
                                                <span className="text-xs">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                                            )}
                                        </button>
                                    </th>
                                    <th className="p-2 text-center">Observaciones</th>
                                    <th className="p-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedReporte.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-4 text-center text-gray-500">{error ? '—' : 'Sin datos para mostrar'}</td>
                                    </tr>
                                ) : sortedReporte.map((r, i) => (
                                    <tr key={i} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                        <td className="p-2 font-mono text-xs">{r.matricula}</td>
                                        <td className="p-2">{r.alumno}</td>
                                        <td className="p-2">{r.materia}</td>
                                        <td className="p-2">{r.grupo}</td>
                                        <td className="p-2 font-semibold">{r.nota}</td>
                                        <td className="p-2">{r.observaciones}</td>
                                        <td className="p-2">
                                            <button onClick={() => startEdit(r, i)} className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {editRow && (
                        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-20">
                            <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                                <h3 className="text-lg font-semibold mb-4">Editar calificación</h3>
                                {error && (
                                    <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm text-gray-700">Matrícula</label>
                                        <div className="mt-1 px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 font-mono text-xs">{editRow.matricula}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-700">Nota</label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={editRow.nota}
                                            onChange={e => {
                                                const val = e.target.value
                                                if (/^(\d{0,2}\.?\d*)$/.test(val) || val === '') {
                                                    setEditRow({ ...editRow, nota: val })
                                                }
                                            }}
                                            placeholder="0.00"
                                            className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-gray-700">Observaciones</label>
                                        <textarea value={editRow.observaciones} onChange={e => setEditRow({ ...editRow, observaciones: e.target.value })} className="mt-1 w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50" rows={3} />
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-end gap-2">
                                    <button onClick={cancelEdit} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700">Cancelar</button>
                                    <button onClick={saveEdit} className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">Guardar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    )
}
