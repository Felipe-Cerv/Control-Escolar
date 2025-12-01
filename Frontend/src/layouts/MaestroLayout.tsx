import React from 'react'
import { Outlet } from 'react-router-dom'
import UserMenu from '../components/common/UserMenu'

export default function MaestroLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <header className="px-6 py-4 bg-slate-800 text-white flex items-center justify-between shadow">
                <h1 className="text-lg font-semibold tracking-wide">Panel Maestro</h1>
                <UserMenu />
            </header>
            <main className="p-6 max-w-7xl mx-auto"><Outlet /></main>
        </div>
    )
}
