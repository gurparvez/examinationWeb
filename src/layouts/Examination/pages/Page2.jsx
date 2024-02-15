import React from 'react'
import { Input } from '../../../components'

const Page2 = () => {
  return (
    <div className='px-6 xs:px-10 sm:px-14 py-8'>
        <h1 className='text-xl font-bold'>Courses Info :</h1>
        <div className='bg-gray-200 rounded-lg'>
            <div className='flex flex-col sm:flex-row w-full *:my-3 *:sm:my-1 p-5'>
                <Input label="Subject" />
                <div className='hidden sm:block h-9 w-[1px] bg-black mx-2 box-border'></div>
                <Input label="Subject" />
            </div>
            <div className='flex flex-col sm:flex-row w-full *:my-3 *:sm:my-1 p-5'>
                <Input label="Subject" />
                <div className='hidden sm:block h-9 w-[1px] bg-black mx-2 box-border'></div>
                <Input label="Subject" />
            </div>
            <div className='flex flex-col sm:flex-row w-full *:my-3 *:sm:my-1 p-5'>
                <Input label="Subject" />
                <div className='hidden sm:block h-9 w-[1px] bg-black mx-2 box-border'></div>
                <Input label="Subject" />
            </div>
        </div>
    </div>
  )
}

export default Page2