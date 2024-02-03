import React, { useId } from 'react'

function Input({ name, label, type, value, setValue, required=true }) {

    const id = useId()

    const handleValueChange = (e) => {
        if (!setValue && type!="file") {
          alert('setValue function not passed!')
          return;
        }
        if (type === 'file') {
          const file = e.target.files[0];
          console.log(file);
          //Upload the file
    
          return;
        }
        setValue(e.target.value)
        console.log(value);
      }

    return (
        <div className='relative mb-3'>
            <input
                className='peer w-full h-10 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow-500 placeholder-transparent'
                id={id}
                name={name}
                type={type}
                placeholder={label}
                value={value}
                onchange={handleValueChange}
                required={required}
            />
            <label
                htmlFor={id}
                className='absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
            >
                {label}
            </label>
        </div>
    )
}

export default Input