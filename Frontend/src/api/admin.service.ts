import axiosClient from './axiosClient'

export interface Materia {
    materia_id: number
    codigo: string
    nombre: string
    created_at: string
    updated_at: string
}

export interface PromedioPorMateria {
    codigo: string
    nombre: string
    total_alumnos: string | number
    promedio: number
}

export interface PromedioGeneralAlumno {
    matricula: string
    nombre: string
    promedio: number
}

function unwrap<T>(data: any): T {
    if (!data) throw new Error('Sin respuesta del servidor')
    if (data.ok === false) {
        const msg = data.error || data.message || 'Error en solicitud'
        const err = new Error(msg)
            ; (err as any).code = data.code
        throw err
    }
    return data.data as T
}

export const adminService = {
    async getDashboard() {
        const { data } = await axiosClient.get('/admin/dashboard')
        return data
    },

    async getUsuarios() {
        const { data } = await axiosClient.get('/admin/usuarios')
        return data
    },

    async getPromediosPorMateria(materias: number[]) {
        const qs = materias.length ? materias.join(',') : ''
        const { data } = await axiosClient.get(`/admin/promediosPorMateria`, {
            params: { materias: qs }
        })
        return unwrap<PromedioPorMateria[]>(data)
    },

    async getPromediosGenerales(periodoId: number) {
        const { data } = await axiosClient.get(`/admin/promediosGenerales`, {
            params: { periodo_id: periodoId }
        })
        return unwrap<PromedioGeneralAlumno[]>(data)
    },

    async getMaterias() {
        const { data } = await axiosClient.get('/materias/')
        return unwrap<Materia[]>(data)
    },

    async getCalificacionesPorMateria(materiaIds: number[]) {
        const qs = materiaIds.length ? materiaIds.join(',') : ''
        const { data } = await axiosClient.get('/admin/promediosPorMateria', {
            params: { materias: qs }
        })
        return unwrap<any[]>(data)
    },

    async getAlumnoPorMatricula(matricula: string) {
        const { data } = await axiosClient.get('/alumnos/', {
            params: { matricula }
        })
        if (data && data.ok === true && data.data) {
            return data.data as {
                alumno_id: number
                matricula: string
                usuario_id: number
                created_at: string
                updated_at: string
                nombre: string
                grupo: string
                calificaciones: Array<{
                    codigo: string
                    materia: string
                    nota: string
                    maestro: string
                }>
            }
        }
        const msg = (data && (data.error || data.message)) || 'No se encontró un alumno con esa matrícula'
        const err = new Error(msg);
        ; (err as any).code = data?.code
        throw err
    },

    async eliminarCalificacion(calificacionId: number) {
        const { data } = await axiosClient.delete(`/admin/calificaciones/${calificacionId}`)
        return data
    }
}

export default adminService
