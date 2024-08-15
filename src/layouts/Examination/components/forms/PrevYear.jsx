import React from 'react';
import { Button, Input } from '../../../../components/index.js';
import Select from '../../../../components/Inputs/Select.jsx';

const PrevYear = ({
    register,
    isLoading,
    error,
    inputFields,
    addInputField,
    removeInputField,
    resultOptions,
    resultValue,
    setResultValue,
}) => {
    return (
        <div className='my-8'>
            <h3 className='font-jost text-lg font-bold text-gray-700'>
                Previous Year Details
            </h3>
            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                <div className=''>
                    <Input
                        label='Examination'
                        {...register('examination', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                    <Input
                        label='University'
                        {...register('university', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                    <Input
                        label='Session/Passing year'
                        type='number'
                        min='2010'
                        max={new Date().getFullYear()}
                        step='1'
                        {...register('session', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                </div>
                <div className=''>
                    <Input
                        label='UID/Roll Number'
                        {...register('auid', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                    <Select
                        heading='Result'
                        options={resultOptions}
                        value={resultValue}
                        onChange={(e) => setResultValue(e.target.value)}
                    />
                    <Input
                        label='Obtained Marks'
                        {...register('marksObtained', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                    <Input
                        label='Maximum Marks'
                        {...register('marksMax', {
                            required: {
                                value: true,
                                message: 'Please fill this field',
                            },
                        })}
                        error={error}
                    />
                </div>
                <div className='flex flex-wrap'>
                    {inputFields.map((field, index) => (
                        <Input
                            key={index}
                            label={field.label}
                            {...register(`coursePassed[${index}]`, {
                                required: {
                                    value: true,
                                    message: 'Please fill this field',
                                },
                            })}
                            error={error}
                        />
                    ))}
                    <Button
                        onClick={addInputField}
                        data='Add Subject'
                        className={isLoading ? 'bg-secondary' : ''}
                    />
                    {inputFields.length > 1 && (
                        <Button
                            onClick={removeInputField}
                            data='Remove Subject'
                            className={isLoading ? 'bg-secondary' : ''}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PrevYear;
