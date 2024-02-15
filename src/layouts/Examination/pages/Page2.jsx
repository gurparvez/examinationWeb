import { Input } from 'postcss'
import React from 'react'

const Page2 = () => {
  return (
    <div className='px-6 xs:px-10 sm:px-14 py-8'>
        <h1 className='text-xl font-bold'>Personal Info :</h1>
        <div className='bg-gray-200 rounded-lg'>
            <div>
                <Input />
            </div>
        </div>
    </div>
  )
}

export default Page2