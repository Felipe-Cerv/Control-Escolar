import React from 'react'

export default function Loader() {
    return (
        <div aria-hidden="true" className="flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-t-transparent border-gray-300 rounded-full animate-spin" />
        </div>
    )
}
