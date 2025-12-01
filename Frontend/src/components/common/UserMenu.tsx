import React, { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'

export default function UserMenu() {
    const { user, logout } = useAuth()
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        window.addEventListener('mousedown', handleClickOutside)
        return () => window.removeEventListener('mousedown', handleClickOutside)
    }, [open])

    const nombre = user?.nombre || 'Usuario'
    const email = user?.email || '—'

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen(o => !o)
                }
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium backdrop-blur-sm"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-xs font-bold text-white">
                    {nombre.substring(0, 2).toUpperCase()}
                </div>
                <span className="hidden sm:inline text-white truncate max-w-[120px]">{nombre}</span>
                <svg className={`w-4 h-4 text-white transition ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white shadow-lg p-4 z-50 text-sm">
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
                            {nombre.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="font-semibold text-gray-800 leading-tight truncate">{nombre}</p>
                            <p className="text-gray-500 text-xs truncate" title={email}>{email}</p>
                        </div>
                    </div>
                    <div className="py-3 space-y-2">
                        <button
                            onClick={() => { logout(); setOpen(false) }}
                            className="w-full text-left px-3 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-medium transition"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
