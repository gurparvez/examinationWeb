import {
    Button,
    Checkbox,
    DialogLib,
    FadePage,
    Input,
    ShowError,
} from '../../../components/index.js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../hooks/useApi.js';
import { api } from '../../../constants/index.js';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { put } from '../../../store/formSlice.js';
import Select from '../../../components/Inputs/Select.jsx';
import { useNavigate } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';

const FormFill = ({ regular = 1 }) => {
    const [q1, setQ1] = useState(false);
    const [q2, setQ2] = useState(false);
    const [q3, setQ3] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [resultValue, setResultValue] = useState('pass');
    const [inputFields, setInputFields] = useState([
        { label: 'Subjects', name: 'coursePassed[]' },
    ]);
    const forms = useSelector((state) => state.form.formsData);
    const { register, handleSubmit } = useForm();
    const { apiData, response, isLoading, progress, error } = useApi('post');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const resultOptions = [
        { value: 'pass', label: 'Pass' },
        { value: 'fail', label: 'Fail' },
        { value: 're-appear', label: 'Re-Appear' },
    ];

    const addInputField = () => {
        const newIndex = inputFields.length;
        const newInputFields = [
            ...inputFields,
            { label: 'New Subject', name: `coursePassed[${newIndex}]` },
        ];
        setInputFields(newInputFields);
    };

    const removeInputField = () => {
        if (inputFields.length > 1) {
            const newInputFields = inputFields.slice(0, -1);
            setInputFields(newInputFields);
        } else {
            console.warn(
                'Cannot remove the last input field. There must be at least one.',
            );
        }
    };

    const submitExam = async (data) => {
        data.regular = `${regular}`;
        data.result = resultValue;
        data.qus1 = q1;
        data.qus2 = q2;
        data.qus3 = q3;
        // console.log(data)
        await apiData(api.submitForm, data);
    };

    const closeDialog = () => {
        setFormSubmitted(false);
        navigate('/home/examination');
    };

    useEffect(() => {
        if (response && !error) {
            const newForms = Object.assign([], forms);
            newForms.push(response?.data);
            dispatch(put(newForms));
            setFormSubmitted(true);
        } else if (error) {
            console.log('There was an error');
        } else if (!response) {
            console.log('No response');
        }
    }, [response, error]);

    return (
        <div>
            <div
                className={`flex w-full justify-center border-4 ${isLoading || formSubmitted ? 'pointer-events-none' : 'pointer-events-auto'}`}
            >
                <LoadingBar color='#f11946' height={3} progress={progress} />
                {isLoading || formSubmitted ? <FadePage /> : <div />}
                {formSubmitted && (
                    <DialogLib
                        svgComponent={CheckBadgeIcon}
                        svgClassName='text-green-600 bg-green-100'
                        open={formSubmitted}
                        onClose={closeDialog}
                        Heading='Successfully Submitted'
                        para='Your regular examination form has been submitted successfully.'
                        value1='View Form'
                        url1={`/home/${response?.data._id}`}
                        value2='Home'
                        url2={`/home`}
                    />
                )}
                <form
                    onSubmit={handleSubmit(submitExam)}
                    className='my-5 w-[95%] rounded border-2 bg-gray-200 p-3 drop-shadow-xl'
                >
                    <div className='my-2 border-b-2 border-gray-800'>
                        <h1 className='font-jost text-3xl font-bold'>
                            Regular
                        </h1>
                    </div>
                    <div className='my-8'>
                        <h3 className='font-jost text-lg font-bold text-gray-700'>
                            Examination Fee Details
                        </h3>
                        <div>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                                <div className=''>
                                    <Input
                                        label='Receipt Number'
                                        {...register('receiptNumber', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
                                            },
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label='Fees'
                                        {...register('fees', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
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
                                                message:
                                                    'Please fill this field',
                                            },
                                        })}
                                        error={error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <h3 className='font-jost text-lg font-bold text-gray-700'>
                            Previous Year Details
                        </h3>
                        <div>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                                <div className=''>
                                    <Input
                                        label='Examination'
                                        {...register('examination', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
                                            },
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label='University'
                                        {...register('university', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
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
                                                message:
                                                    'Please fill this field',
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
                                                message:
                                                    'Please fill this field',
                                            },
                                        })}
                                        error={error}
                                    />
                                    <Select
                                        heading='Result'
                                        options={resultOptions}
                                        value={resultValue}
                                        onChange={(e) =>
                                            setResultValue(e.target.value)
                                        }
                                    />
                                    <Input
                                        label='Obtained Marks'
                                        {...register('marksObtained', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
                                            },
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label='Maximum Marks'
                                        {...register('marksMax', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
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
                                            {...register(
                                                `coursePassed[${index}]`,
                                                {
                                                    required: {
                                                        value: true,
                                                        message:
                                                            'Please fill this field',
                                                    },
                                                },
                                            )}
                                            error={error}
                                        />
                                    ))}
                                    <Button
                                        onClick={addInputField}
                                        data='Add Subject'
                                        className={
                                            isLoading ? 'bg-secondary' : ''
                                        }
                                    />
                                    {inputFields.length > 1 && (
                                        <Button
                                            onClick={removeInputField}
                                            data='Remove Subject'
                                            className={
                                                isLoading ? 'bg-secondary' : ''
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {!regular && (
                        <div className='my-8'>
                            <h3 className='font-jost text-lg font-bold text-gray-700'>
                                Re-Appear Subject Details
                            </h3>
                            <div>
                                <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                                    <div>
                                        <Input
                                            label='Subject Code'
                                            {...register('subjectCode', {
                                                required: {
                                                    value: true,
                                                    message:
                                                        'Please fill this field',
                                                },
                                            })}
                                            error={error}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='my-8'>
                        <h3 className='font-jost text-lg font-bold text-gray-700'>
                            Just Answer
                        </h3>
                        <div>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2'>
                                <div className=''>
                                    <Checkbox
                                        text='Have You ever been disqualified ?'
                                        checked={q1}
                                        onChange={() => {
                                            setQ1((prev) => !prev);
                                        }}
                                    />
                                    <Checkbox
                                        text='Are you appearing in two examinations simulatneously ?'
                                        checked={q2}
                                        onChange={() => {
                                            setQ2((prev) => !prev);
                                        }}
                                    />
                                    <Checkbox
                                        text='Have you applied for re-evevaluation of lower examination ?'
                                        checked={q3}
                                        onChange={() => {
                                            setQ3((prev) => !prev);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <div>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2'>
                                {error && <ShowError error={error} />}
                            </div>
                        </div>
                    </div>
                    <Button
                        type='submit'
                        data='Submit'
                        className={isLoading ? 'bg-secondary' : ''}
                    />
                </form>
            </div>
        </div>
    );
};

export default FormFill;
