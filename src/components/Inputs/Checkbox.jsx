import React, { forwardRef, useId } from 'react';

const Checkbox = (
    {
        text = 'Checkbox',
        checked = true,
        error = false,
        readonly = false,
        className,
        ...props
    },
    ref,
) => {
    const id = useId();

    return (
        <div
            className={`flex items-center ${readonly && 'bg-gray-100'} ${error && 'border-red-600'} rounded border px-2 ${className}`}
        >
            <input
                ref={ref}
                checked={checked}
                id={id}
                type='checkbox'
                readOnly={readonly}
                disabled={readonly}
                {...props}
                className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600'
            />
            <label
                htmlFor={id}
                className='ms-2 text-sm font-medium text-gray-500'
            >
                {text}
            </label>
        </div>
    );
};

export default forwardRef(Checkbox);
