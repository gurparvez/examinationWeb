import React, { useState, forwardRef, useId } from 'react';

const Input = forwardRef(
    (
        {
            label = '',
            type = 'text',
            className = '',
            error = '',
            readonly = false,
            ...props
        },
        ref,
    ) => {
        const id = useId();
        const [isFocused, setIsFocused] = useState(false);
        const [isPasswordVisible, setIsPasswordVisible] = useState(false);

        const handleFocus = () => {
            setIsFocused(true);
        };

        const handleBlur = () => {
            setIsFocused(false);
        };

        const togglePasswordVisibility = () => {
            setIsPasswordVisible((prevState) => !prevState);
        };

        return (
            <div className={`w-full ${className}`}>
                <div className='relative h-10 w-full min-w-[200px]'>
                    <input
                        className={`${error ? 'border-red-600' : ''} ${readonly ? 'pointer-events-none bg-gray-100 text-gray-500' : 'bg-transparent'} text-blue-gray-700 disabled:bg-blue-gray-50 placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 peer h-full w-full rounded-[7px] border border-t-transparent px-3 py-2.5 font-sans text-sm font-normal outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0`}
                        ref={ref}
                        id={id}
                        type={isPasswordVisible ? 'text' : type}
                        readOnly={readonly}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        {...props}
                        placeholder=' '
                    />
                    <label
                        htmlFor={id}
                        className={`${error ? 'text-red-600' : ''} peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-semibold leading-tight text-gray-500 transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-l before:border-t before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-r after:border-t after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-l-2 peer-focus:before:border-t-2 peer-focus:before:!border-gray-900 peer-focus:after:border-r-2 peer-focus:after:border-t-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent`}
                    >
                        {label}
                    </label>
                    {isFocused && type === 'password' && (
                        <span
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-blue-500"
                        >
                            {isPasswordVisible ? 'hide' : 'see'}
                        </span>
                    )}
                </div>
            </div>
        );
    }
);

export default Input;
