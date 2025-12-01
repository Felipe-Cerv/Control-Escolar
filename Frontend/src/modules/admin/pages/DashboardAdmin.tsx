import React, { useEffect, useState } from 'react'
import adminService, { PromedioPorMateria, PromedioGeneralAlumno, Materia } from '../../../api/admin.service'
import Loader from '../../../components/common/Loader'

export default function DashboardAdmin() {
    const [materias, setMaterias] = useState<Materia[]>([])
    const [selectedMaterias, setSelectedMaterias] = useState<number[]>([])
    const [periodoId, setPeriodoId] = useState<number>(1)
    const [porMateria, setPorMateria] = useState<PromedioPorMateria[] | null>(null)
    const [generales, setGenerales] = useState<PromedioGeneralAlumno[] | null>(null)
    const [loadingMateria, setLoadingMateria] = useState(false)
    const [loadingGenerales, setLoadingGenerales] = useState(false)
    const [errorMateria, setErrorMateria] = useState<string>('')
    const [errorGenerales, setErrorGenerales] = useState<string>('')

    function toggleMateria(id: number) {
        setSelectedMaterias(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        )
    }

    async function fetchPorMateria() {
        setLoadingMateria(true)
        setErrorMateria('')
        try {
            if (selectedMaterias.length === 0) {
                setPorMateria([])
            } else {
                const data = await adminService.getPromediosPorMateria(selectedMaterias)
                setPorMateria(data)
            }
        } catch (e: any) {
            setErrorMateria(e.message || 'Error al cargar promedios por materia')
        } finally {
            setLoadingMateria(false)
        }
    }

    async function fetchGenerales() {
        setLoadingGenerales(true)
        setErrorGenerales('')
        try {
            const data = await adminService.getPromediosGenerales(periodoId)
            setGenerales(data)
        } catch (e: any) {
            setErrorGenerales(e.message || 'Error al cargar promedios generales')
        } finally {
            setLoadingGenerales(false)
        }
    }

    useEffect(() => {
        const loadMaterias = async () => {
            try {
                const data = await adminService.getMaterias()
                setMaterias(data)
            } catch (e: any) {
                setErrorMateria(e.message || 'Error al cargar materias')
            }
        }
        loadMaterias()
        fetchPorMateria()
        fetchGenerales()
    }, [])

    const maxPromedioMateria = porMateria?.reduce((m, r) => Math.max(m, r.promedio), 0) || 10
    const maxPromedioGeneral = generales?.reduce((m, r) => Math.max(m, r.promedio), 0) || 10

    return (
        <div className="space-y-10 pb-10">
            <header className="space-y-3">
                <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
                <p className="text-gray-600 text-sm">Reportes de calificaciones y promedios. Usa los filtros para refinar.</p>
                <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleTimeString()}</div>
            </header>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6 relative">
                {loadingMateria && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                        <Loader />
                    </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">Promedios por materia</h3>
                <div className="space-y-3">
                    <label className="text-sm font-medium text-gray-700">Selecciona Materias</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-xl bg-gray-50">
                        {materias.map(m => (
                            <label key={m.materia_id} className="flex items-center gap-2 p-3 rounded-lg hover:bg-white border border-transparent hover:border-indigo-200 cursor-pointer transition">
                                <input
                                    type="checkbox"
                                    checked={selectedMaterias.includes(m.materia_id)}
                                    onChange={() => toggleMateria(m.materia_id)}
                                    className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    {m.codigo} - {m.nombre}
                                </span>
                            </label>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{selectedMaterias.length} materia(s) seleccionada(s)</span>
                        <button
                            onClick={fetchPorMateria}
                            disabled={loadingMateria || selectedMaterias.length === 0}
                            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold shadow"
                        >
                            {loadingMateria ? 'Cargando...' : 'Actualizar'}
                        </button>
                    </div>
                </div>
                {errorMateria && <div className="text-sm bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-2">{errorMateria}</div>}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-2 text-left">Código</th>
                                <th className="p-2 text-left">Materia</th>
                                <th className="p-2 text-left">Alumnos</th>
                                <th className="p-2 text-left">Promedio</th>
                                <th className="p-2 text-left">Visual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {porMateria?.map(r => (
                                <tr key={r.codigo} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="p-2 font-mono text-xs">{r.codigo}</td>
                                    <td className="p-2">{r.nombre}</td>
                                    <td className="p-2">{r.total_alumnos}</td>
                                    <td className="p-2 font-semibold">{r.promedio.toFixed(2)}</td>
                                    <td className="p-2">
                                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{ width: `${(r.promedio / maxPromedioMateria) * 100}%` }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )) || (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-500">Sin datos</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 space-y-6 relative">
                {loadingGenerales && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
                        <Loader />
                    </div>
                )}
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">Promedios generales por alumno</h3>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                        <label className="text-sm font-medium text-gray-700">Periodo ID</label>
                        <input
                            type="number"
                            value={periodoId}
                            onChange={e => setPeriodoId(Number(e.target.value) || 1)}
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
                            min={1}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            onClick={fetchGenerales}
                            disabled={loadingGenerales}
                            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold shadow"
                        >
                            {loadingGenerales ? 'Cargando...' : 'Actualizar'}
                        </button>
                    </div>
                </div>
                {errorGenerales && <div className="text-sm bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-2">{errorGenerales}</div>}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-2 text-left">Matrícula</th>
                                <th className="p-2 text-left">Nombre</th>
                                <th className="p-2 text-left">Promedio</th>
                                <th className="p-2 text-left">Visual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generales?.map(a => (
                                <tr key={a.matricula} className="border-t border-gray-200 odd:bg-white even:bg-gray-50 hover:bg-gray-100">
                                    <td className="p-2 font-mono text-xs">{a.matricula}</td>
                                    <td className="p-2">{a.nombre}</td>
                                    <td className="p-2 font-semibold">{a.promedio.toFixed(2)}</td>
                                    <td className="p-2">
                                        <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                                            <div
                                                className="h-full bg-indigo-600"
                                                style={{ width: `${(a.promedio / maxPromedioGeneral) * 100}%` }}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            )) || (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-gray-500">Sin datos</td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}
