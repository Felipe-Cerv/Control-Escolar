import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }

export default function Button({ children, ...rest }: Props) {
    return (
        <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" {...rest}>
            {children}
        </button>
    )
}
