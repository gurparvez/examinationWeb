import {
    Button,
    DialogLib,
    FadePage,
    ShowError,
} from '../../../components/index.js';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useApi from '../../../hooks/useApi.js';
import { api } from '../../../constants/index.js';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch, useSelector } from 'react-redux';
import { put } from '../../../store/formSlice.js';
import { useNavigate } from 'react-router-dom';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import {
    FeeDetails,
    PrevYear,
    ReAppearSubs,
    ThreeQues,
} from '../components/forms/index.js';

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
        navigate('/user/examination');
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
                className={`flex w-full justify-center border-4 ${isLoading || formSubmitted ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
                        url1={`/user/${response?.data._id}`}
                        value2='Home'
                        url2={`/user`}
                    />
                )}
                <form
                    onSubmit={handleSubmit(submitExam)}
                    className='my-5 w-[95%] rounded border-2 bg-gray-200 p-3 drop-shadow-xl'>
                    <div className='my-2 border-b-2 border-gray-800'>
                        <h1 className='font-jost text-3xl font-bold'>
                            {regular ? 'Regular' : 'Re-Appear'}
                        </h1>
                    </div>

                    <FeeDetails register={register} error={error} />

                    <PrevYear
                        register={register}
                        error={error}
                        inputFields={inputFields}
                        addInputField={addInputField}
                        removeInputField={removeInputField}
                        resultOptions={resultOptions}
                        resultValue={resultValue}
                        setResultValue={setResultValue}
                    />

                    {!regular && (
                        <ReAppearSubs register={register} error={error} />
                    )}

                    <ThreeQues
                        q1={q1}
                        q2={q2}
                        q3={q3}
                        setQ1={setQ1}
                        setQ2={setQ2}
                        setQ3={setQ3}
                    />

                    <div className='my-8'>
                        <div>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2'>
                                {error && <ShowError error={error} />}
                            </div>
                        </div>
                    </div>
                    <Button type='submit' data='Submit' isLoading={isLoading} />
                </form>
            </div>
        </div>
    );
};

export default FormFill;
