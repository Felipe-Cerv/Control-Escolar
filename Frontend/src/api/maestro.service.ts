import axiosClient from './axiosClient'

export const maestroService = {
    async getDashboard() {
        const { data } = await axiosClient.get('/maestro/dashboard')
        return data
    },

    async getGrupos() {
        const { data } = await axiosClient.get('/maestro/grupos')
        return data
    },

    async getReporte() {
        const { data } = await axiosClient.get('/maestros/reporte')
        if (data?.ok === false) {
            const err = new Error(data.error || data.message || 'Error al obtener reporte')
                ; (err as any).code = data.code
            throw err
        }
        return (data?.data || []) as Array<{
            calificacion_id: number
            matricula: string
            alumno: string
            materia: string
            grupo: string
            nota: number
            observaciones: string
        }>
    },

    async actualizarCalificacion(payload: { calificacion_id: number; nueva_nota: number; observaciones: string | null }) {
        const { data } = await axiosClient.patch('/maestros/calificacion', payload)
        return data
    },

    async getMaterias(maestroId: number) {
        const { data } = await axiosClient.get('/maestros/materias', {
            params: { maestro_id: maestroId }
        })
        if (data?.ok === false) {
            const err = new Error(data.error || data.message || 'Error al obtener materias')
                ; (err as any).code = data.code
            throw err
        }
        return (data?.data || []) as Array<{
            materia_id: number
            codigo: string
            nombre: string
            created_at: string
            updated_at: string
        }>
    },

    async getGruposMaestro(maestroId: number) {
        const { data } = await axiosClient.get('/maestros/grupos', {
            params: { maestro_id: maestroId }
        })
        if (data?.ok === false) {
            const err = new Error(data.error || data.message || 'Error al obtener grupos')
                ; (err as any).code = data.code
            throw err
        }
        return (data?.data || []) as Array<{
            grupo_id: number
            descripcion: string
        }>
    }
}

export default maestroService
