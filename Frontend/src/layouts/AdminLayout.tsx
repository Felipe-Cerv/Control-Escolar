import { Outlet, NavLink } from 'react-router-dom'
import UserMenu from '../components/common/UserMenu'

export default function AdminLayout() {
    const navLinks = [
        { to: '/admin/calificaciones-alumno', label: 'Calificaciones Alumno', end: false },
        { to: '/admin/todas-calificaciones', label: 'Promedio por alumno', end: false },
        { to: '/admin/calificaciones-materia', label: 'Por Materia', end: false }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="px-6 py-4 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white flex items-center justify-between shadow">
                <h1 className="text-lg font-semibold tracking-wide">Administración</h1>
                <UserMenu />
            </header>
            <nav className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm">
                <ul className="flex gap-1 max-w-7xl mx-auto flex-wrap">
                    {navLinks.map((link) => (
                        <li key={link.to}>
                            <NavLink
                                to={link.to}
                                end={link.end}
                                className={({ isActive }) =>
                                    `inline-block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <main className="p-6 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    )
}
