import React, { forwardRef, useId } from 'react'

function Input({
    label,
    type="text",
    className='',
    error='',
    readonly=false,
    ...props
}, ref) {

    const id = useId()

    return (
        <>
        <div className={`relative ${className}`}>
            <input
                className={`peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500 placeholder-transparent ${error ? 'border-red-600' : ''}`}
                ref={ref}
                id={id}
                type={type}
                placeholder={label}
                readOnly={readonly}
                {...props}
            />
            <label
                htmlFor={id}
                className={`absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm ${error ? 'text-red-600' : ''}`}
            >
                {label}
            </label>
        </div>
        </>
    )
}

export default forwardRef(Input)