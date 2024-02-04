import React from 'react'

const Button = ({ data = "button" }) => {
  return (
    <button className='bg-primary w-auto border-none rounded py-1 px-2 hover:cursor-pointer hover:bg-secondary hover:text-white transition-all ease-in-out' >
      {data}
    </button>
  )
}

export default Button