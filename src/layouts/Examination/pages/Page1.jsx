import React from 'react'
import { Input } from '../../../components'

const Page1 = () => {
  return (
    <div>
        <div className='w-full flex justify-center border-4'>
            <div className='w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl'>
                <div className='border-b-2 border-gray-800 my-2'>
                    <h1 className='text-3xl font-bold font-jost'>Regular</h1>
                </div>
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Receipt Details</h3>
                    <form>
                        <div
                            className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                            <div className=''>
                                <Input
                                    label="Receipt Number"
                                    
                                />
                                <Input
                                    label="Fees"
                                    
                                />
                                <Input
                                    label="Date of Fees Submition"
                                    
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Approved By</h3>
                    <div className='bg-gray-50 p-2 *:my-4 rounded-lg shadow-xl'>
                        <p>Mentor: No</p>
                        <p>HOD: No</p>
                        <p>Controller: No</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page1