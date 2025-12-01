import React from 'react'

export function AdminCard({ children }: { children?: React.ReactNode }) {
    return <div className="p-3 border rounded-md bg-slate-50">{children}</div>
}

export default AdminCard
