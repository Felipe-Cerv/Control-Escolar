import React from 'react'

export default function Unauthorized() {
    return (
        <div className="p-6 text-center">
            <h2 className="text-2xl font-semibold">No autorizado</h2>
            <p>Necesitas iniciar sesión o no tienes permisos suficientes.</p>
        </div>
    )
}
