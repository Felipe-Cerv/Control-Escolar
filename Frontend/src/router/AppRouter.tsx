import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Unauthorized from '../pages/Unauthorized'
import ProtectedRoute from './ProtectedRoute'
import { DashboardMaestro, MisGrupos, CalificarGrupo, PerfilMaestro } from '../modules/maestro'
import { CalificacionesAlumno, TodasCalificaciones, CalificacionesMateria } from '../modules/admin'
import MaestroLayout from '../layouts/MaestroLayout'
import AdminLayout from '../layouts/AdminLayout'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />

                <Route path="/maestro" element={<ProtectedRoute><MaestroLayout /></ProtectedRoute>}>
                    <Route index element={<DashboardMaestro />} />
                    <Route path="mis-grupos" element={<MisGrupos />} />
                    <Route path="calificar" element={<CalificarGrupo />} />
                    <Route path="perfil" element={<PerfilMaestro />} />
                </Route>

                <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<CalificacionesAlumno />} />
                    <Route path="calificaciones-alumno" element={<CalificacionesAlumno />} />
                    <Route path="todas-calificaciones" element={<TodasCalificaciones />} />
                    <Route path="calificaciones-materia" element={<CalificacionesMateria />} />
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
