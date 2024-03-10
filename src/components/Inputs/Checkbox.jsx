import React, { forwardRef } from "react";

const Checkbox = ({
    text="Checkbox",
    checked=true,
    error=false,
    className,
    readonly = false,
    ...props
}, ref) => {
    return(
        <div className={`flex items-center ${readonly && "bg-gray-100"} ${error && "border-red-600"} rounded border px-2 ${className}`}>
            <input ref={ref} checked={checked} id="checked-checkbox" type="checkbox" readOnly={readonly} {...props}
                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
            <label htmlFor="checked-checkbox" className="ms-2 text-sm font-medium text-gray-500">{text}</label>
        </div>
    )
}

export default forwardRef(Checkbox)