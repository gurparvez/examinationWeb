import LoadingBar from "react-top-loading-bar";
import {Button, Checkbox, DialogLib, FadePage, Input, ShowError} from "../../../components/index.js";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import useApi from "../../../hooks/useApi.js";
import {api} from "../../../constants/index.js";
import {put} from "../../../store/formSlice.js";
import {useDispatch, useSelector} from "react-redux";
import Select from "../../../components/Inputs/Select.jsx";
import {useNavigate} from "react-router-dom";

const ReAppear = () => {

    const [q1, setQ1] = useState(true)
    const [q2, setQ2] = useState(true)
    const [q3, setQ3] = useState(true)
    const [resultValue, setResultValue] = useState("pass")
    const [inputFields, setInputFields] = useState([{ label: 'Subjects', name: 'coursePassed[]' }]);
    const {register, handleSubmit, setValue} = useForm();
    const {apiData, response, isLoading, progress, error} = useApi('post');
    const dispatch = useDispatch()
    const forms = useSelector(state => state.form.formsData)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const navigate = useNavigate()
    const resultOptions = [
        { value: 'pass', label: 'Pass' },
        { value: 'fail', label: 'Fail' },
        { value: 're-appear', label: 'Re-Appear' },
    ];

    const addInputField = () => {
        const newIndex = inputFields.length;
        const newInputFields = [
            ...inputFields,
            { label: 'New Subject', name: `coursePassed[${newIndex}]` }
        ];
        setInputFields(newInputFields);
    };

    const removeInputField = () => {
        if (inputFields.length > 1) {
            const newInputFields = inputFields.slice(0, -1);
            setInputFields(newInputFields);
        } else {
            console.warn("Cannot remove the last input field. There must be at least one.");
        }
    }

    const submitExam = async (data) => {
        data.regular = "0"
        data.result = resultValue
        // console.log(data)
        await apiData(api.submitForm, data)
    }

    const closeDialog = () => {
        setFormSubmitted(false);
        navigate('/home/examination');
    };

    useEffect(() => {
        if (response && !error) {
            const newForms = Object.assign([], forms)
            newForms.push(response?.data)
            dispatch(put(newForms))
            setFormSubmitted(true)
        } else if (error) {
            console.log("There was an error");
        } else if (!response) {
            console.log("No response");
        }
    }, [response, error]);

    return(
        <div>
            <div
                className={`w-full flex justify-center border-4 ${isLoading ? 'pointer-events-none':'pointer-events-auto'}`}>
                <LoadingBar color='#f11946' progress={progress} />
                {isLoading && <FadePage />}
                {formSubmitted && <DialogLib open={formSubmitted} onClose={closeDialog}
                                             Heading="Successfully Submitted"
                                             para="Your Re-Appear examination form has been submitted successfully."
                                             value1="View Form" url1={`/home/${response?.data._id}`}
                                             value2="Home" url2={`/home`}/>}
                <form onSubmit={handleSubmit(submitExam)}
                      className='w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl'>
                    <div className='border-b-2 border-gray-800 my-2'>
                        <h1 className='text-3xl font-bold font-jost'>Re-Appear</h1>
                    </div>
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Examination Fee Details</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className=''>
                                    <Input
                                        label="Receipt Number"
                                        {...register("receiptNumber", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label="Fees"
                                        {...register("fees", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label="Date of Fees Submition"
                                        type="date"
                                        {...register("date", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Previous Year Details</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className=''>
                                    <Input
                                        label="Examination"
                                        {...register("examination", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label="University"
                                        {...register("university", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label="Session/Passing year"
                                        type="number"
                                        min="2010"
                                        max={new Date().getFullYear()}
                                        step="1"
                                        {...register("session", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                </div>
                                <div className=''>
                                    <Input
                                        label="UID/Roll Number"
                                        {...register("auid", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Select
                                        heading="Result"
                                        options={resultOptions}
                                        value={resultValue}
                                        onChange={e => setResultValue(e.target.value)}
                                    />
                                    <Input
                                        label="Obtained Marks"
                                        {...register("marksObtained", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                    <Input
                                        label="Maximum Marks"
                                        {...register("marksMax", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                </div>
                                <div className="flex flex-wrap">
                                    {inputFields.map((field, index) => (
                                        <Input
                                            key={index}
                                            label={field.label}
                                            {...register(`coursePassed[${index}]`, {
                                                required: {
                                                    value: true,
                                                    message: 'Please fill this field'
                                                }
                                            })}
                                            error={error}
                                        />
                                    ))}
                                    <Button onClick={addInputField} data="Add Subject"
                                            className={isLoading ? "bg-secondary" : ""}/>
                                    {inputFields.length > 1 && <Button onClick={removeInputField} data="Remove Subject"
                                                                       className={isLoading ? "bg-secondary" : ""}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Re-Appear Subject Details</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div>
                                    <Input
                                        label="Subject Code"
                                        {...register("subjectCode", {
                                            required: {
                                                value: true,
                                                message: "Please fill this field"
                                            }
                                        })}
                                        error={error}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Just Answer</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className=''>
                                    <Checkbox
                                        text="Have You ever been disqualified ?"
                                        checked={q1}
                                        name="qus1"
                                        onChange={(e) => {
                                            setValue("qus1", e.target.checked ? "1" : "0")
                                            setQ1((prev) => !prev)
                                        }}
                                    />
                                    <Checkbox
                                        text="Are you appearing in two examinations simulatneously ?"
                                        checked={q2}
                                        name="qus2"
                                        onChange={(e) => {
                                            setValue("qus2", e.target.checked ? "1" : "0")
                                            setQ2((prev) => !prev)
                                        }}
                                    />
                                    <Checkbox
                                        text="Have you applied for re-evevaluation of lower examination ?"
                                        checked={q3}
                                        name="qus3"
                                        onChange={(e) => {
                                            setValue("qus3", e.target.checked ? "1" : "0")
                                            setQ3((prev) => !prev)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='my-8'>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                {error && <ShowError error={error}/>}
                            </div>
                        </div>
                    </div>
                    <Button type="submit" data="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default ReAppear