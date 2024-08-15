import React from 'react';
import { Input } from '../../../../components/index.js';

const ReAppearSubs = ({ register, error }) => {
    return (
        <div className='my-8'>
            <h3 className='font-jost text-lg font-bold text-gray-700'>
                Re-Appear Subject Details
            </h3>
            <div
                className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                <div>
                    <Input
                        label='Subject Code'
                        {...register('subjectCode', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReAppearSubs;
