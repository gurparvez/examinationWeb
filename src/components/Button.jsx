import React from 'react'

const Button = ({ data = "click", type = "button", bg="bg-primary", className="", ...props }) => {
  return (
    <button type={type} className={`${bg} w-auto border-none rounded py-2 px-2 text-white hover:cursor-pointer hover:bg-secondary transition-all ease-in-out ${className}`} {...props} >
      {data}
    </button>
  )
}

export default Button