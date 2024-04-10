import React, { forwardRef, useId } from "react";

const Checkbox = ({
    text="Checkbox",
    checked=true,
    error=false,
    readonly = false,
    className,
    ...props
}, ref) => {

    const id = useId();

    return(
        <div className={`flex items-center ${readonly && "bg-gray-100"} ${error && "border-red-600"} rounded border px-2 ${className}`}>
            <input ref={ref} checked={checked} id={id} type="checkbox" readOnly={readonly} disabled={readonly} {...props}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor={id} className="ms-2 text-sm font-medium text-gray-500">{text}</label>
        </div>
    )
}

export default forwardRef(Checkbox)