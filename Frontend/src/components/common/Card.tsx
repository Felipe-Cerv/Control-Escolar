import React from 'react'

type Props = { children?: React.ReactNode; className?: string }

export default function Card({ children, className = '' }: Props) {
    return <div className={`p-4 rounded shadow-sm bg-white ${className}`}>{children}</div>
}
