import React from 'react';
import { Input } from '../../../../components/index.js';

const FeeDetails = ({ register, error }) => {
    return (
        <div className='my-8'>
            <h3 className='font-jost text-lg font-bold text-gray-700'>
                Examination Fee Details
            </h3>
            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:my-4 flex flex-col py-1 sm:*:mx-2 sm:flex-row'>
                <Input
                    label='Receipt Number'
                    {...register('receiptNumber', {
                        required: {
                            value: true,
                            message: 'Please fill this field',
                        },
                    })}
                    error={error}
                />
                <Input
                    label='Fees'
                    {...register('fees', {
                        required: {
                            value: true,
                            message: 'Please fill this field',
                        },
                    })}
                    error={error}
                />
                <Input
                    label='Date of Fees Submition'
                    type='date'
                    {...register('date', {
                        required: {
                            value: true,
                            message: 'Please fill this field',
                        },
                    })}
                    error={error}
                />
            </div>
        </div>
    );
};

export default FeeDetails;