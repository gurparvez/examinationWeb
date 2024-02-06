import React from 'react'

const Button = ({ data = "click", type = "button" }) => {
  return (
    <button type={type} className='bg-primary w-auto border-none rounded py-2 px-2 text-white hover:cursor-pointer hover:bg-secondary transition-all ease-in-out' >
      {data}
    </button>
  )
}

export default Button