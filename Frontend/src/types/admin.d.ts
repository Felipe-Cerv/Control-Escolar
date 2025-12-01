export interface Usuario {
    id: string
    nombre: string
    email: string
    role: 'admin' | 'maestro' | 'alumno'
}

export interface Materia {
    id: string
    nombre: string
}
