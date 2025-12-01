import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export default function Input(props: Props) {
    return (
        <input
            {...props}
            className={`border px-2 py-1 rounded focus:outline-none focus:ring ${props.className ?? ''}`}
        />
    )
}
