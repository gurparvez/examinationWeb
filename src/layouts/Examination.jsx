import React from 'react'
import { Input } from '../components'

const Examination = () => {

  

  return (
    <div className='px-14 py-8'>
      personal info section
      <div className='flex flex-row'>
        <div className='w-1/2 p-5 *:py-2'>
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
        <div className='w-1/2 p-5'>
          image
        </div>
      </div>
    </div>
  )
}

export default Examination