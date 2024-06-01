import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, FadePage, Input, ShowError} from "../../components/index.js";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from 'react-hook-form';
import useApi from '../../hooks/useApi.js';
import LoadingBar from 'react-top-loading-bar';
import { api } from '../../constants/index.js';
import { put } from '../../store/formSlice.js';
import Select from '../../components/Inputs/Select.jsx';
import usePatch from '../../hooks/usePatch.js';
import {formatDateForInput, formatDate} from '../../utils'

const ShowForm = () => {

    const [formData, setFormData] = useState({
        receiptNumber: '',
        fees: '',
        date: '',
        subjectCode: '',
    })
    const [prevYearData, setPrevYearData] = useState({
        examination: "",
        university: "",
        session: '',
        auid: '',
        result: '',
        marksMax: '',
        marksObtained: '',
        coursePassed: [],
        qus1: '',
        qus2: '',
        qus3: ''
    })
    const [q1, setQ1] = useState(true)
    const [q2, setQ2] = useState(true)
    const [q3, setQ3] = useState(true)
    const [showDate, setShowDate] = useState(Date.now())
    const [err, setErr] = useState(null)
    const { formId } = useParams();
    const forms = useSelector(state => state.form.formsData)
    const formDetails = forms.filter((form) => form._id === formId)[0]
    const regular = formDetails.regular
    const isEditable = formDetails?.isEditable
    const [isFormEditing, setIsFormEditing] = useState(false)
    const [isPrevYearFormEditing, setIsPrevYearFormEditing] = useState(false)
    const {apiData, response, isLoading, progress, error} = useApi('patch');
    const {patchData, res, isProgressing, prog, e} = usePatch('patch');
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();
    const scrollToPrevFormRef = useRef(null)
    const resultOptions = [
        { value: 'pass', label: 'Pass' },
        { value: 'fail', label: 'Fail' },
        { value: 're-appear', label: 'Re-Appear' },
    ];
    const [inputFields, setInputFields] = useState([]);

    useEffect(() => {
        if (formDetails) {
            setFormData(prev => ({
                ...prev,
                receiptNumber: formDetails.receiptNumber,
                fees: formDetails.fees,
                date: formDetails.date
            }))
            setShowDate(formDetails.date)
            setPrevYearData(prev => ({
                ...prev,
                auid: formDetails.prevYearData.auid,
                examination: formDetails.prevYearData.examination,
                university: formDetails.prevYearData.university,
                session: formDetails.prevYearData.session,
                result: formDetails.prevYearData.result,
                marksMax: formDetails.prevYearData.marksMax,
                marksObtained: formDetails.prevYearData.marksObtained,
                coursePassed: formDetails.prevYearData.coursePassed,
                qus1: formDetails.prevYearData.qus1,
                qus2: formDetails.prevYearData.qus2,
                qus3: formDetails.prevYearData.qus3
            }))
            if (formDetails.regular === false) setFormData(prev => ({...prev, subjectCode: formDetails.subjectCode}))
            setInputFields(formDetails.prevYearData.coursePassed)
            setQ1(formDetails.prevYearData.qus1)
            setQ2(formDetails.prevYearData.qus2)
            setQ3(formDetails.prevYearData.qus3)
        }
    }, [formDetails])

    const handleDateChange = (e) => {
        setErr(null)
        const dateChanged = new Date(e.target.value)
        if (dateChanged <= Date.now()) {
            setFormData({...formData, date: e.target.value})
            setShowDate(e.target.value)
        } else {
            setErr(`Date needs to be less than or equal to ${formatDate(Date.now())} !`)
        }
    }

    const getTimeFromTimestamp = (timestamp) => {
        const dateObject = new Date(timestamp);
        let hours = dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    const getApprovedLabel = (value) => {
        switch (value) {
            case 1:
              return { label: 'Approved', color: 'text-green-500' };
            case 0:
              return { label: 'Pending', color: 'text-gray-700' };
            case -1:
              return { label: 'Rejected', color: 'text-red-700' };
            default:
              return { label: 'Unknown', color: 'black' };
        }
    };

    const handleFormEditClick = () => {
        setIsFormEditing(true);
        window.scrollTo({ top: 0, behavior: "smooth"})
    };

    const handlePrevYearEditClick = () => {
        setIsPrevYearFormEditing(true);
        window.scrollTo({top: scrollToPrevFormRef.current.offsetTop, behavior: "smooth"});
    }

    const updateFormData = async () => {
        formData._id = formId;
        if (!err) await apiData(api.updateForm, formData);
    }

    const updatePrevYearData = async () => {
        prevYearData._id = formId;
        prevYearData.coursePassed = inputFields;
        await patchData(api.updatePrevYearData, prevYearData);
    }

    useEffect(() => {
        console.log(prevYearData);
    }, [prevYearData])

    useEffect(() => {
        if (response && !error) {
            setIsFormEditing(false)
            const newFormDetails = forms.map((form) => form._id === formId ? response.data : form)
            dispatch(put(newFormDetails));
        }
    }, [response, error])

    useEffect(() => {
        if (res && !e) {
            setIsPrevYearFormEditing(false)
            const newFormDetails = forms.map((form) => form._id === formId ? res.data : form)
            dispatch(put(newFormDetails))
        }
    }, [res, e])

    const resultValue = () => {
        return resultOptions.filter(option => option.value === prevYearData.result)[0]?.value
    }

    const addInputField = () => {
        setInputFields([...inputFields, ""]);
    };
    
    const removeInputField = (index) => {
        const newInputFields = [...inputFields];
        newInputFields.splice(index, 1);
        setInputFields(newInputFields);
    };

    return (
        <div className='w-full flex justify-center border-4'>
            <LoadingBar height={3} progress={progress} />
            <LoadingBar height={3} progress={prog} />
            {isLoading || isProgressing && <FadePage />}
            <div className='w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl'>
                <div className='border-b-2 border-gray-800 my-2'>
                    <h1 className='text-3xl font-bold font-jost'>{regular ? "Regular Form" : "Re-appear Form"}</h1>
                    <p className='text-sm font-semibold text-gray-600'>Created
                        on: {formatDate(formDetails.createdAt)}, {getTimeFromTimestamp(formDetails.createdAt)}</p>
                    <p className='text-sm font-semibold text-gray-600'>Submitted
                        on: {formatDate(formDetails.updatedAt)}, {getTimeFromTimestamp(formDetails.updatedAt)}</p>
                </div>
                <form onSubmit={handleSubmit(updateFormData)}>
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Receipt Details</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className=''>
                                    <Input
                                        label="Receipt Number"
                                        value={formData.receiptNumber}
                                        error={error}
                                        readonly={!isFormEditing}
                                        {...register('receiptNumber', {
                                            value: formData.receiptNumber,
                                            onChange: (e) => setFormData({...formData, receiptNumber: e.target.value})
                                        })}
                                    />
                                    <Input
                                        label="Fees"
                                        value={formData.fees}
                                        error={error}
                                        readonly={!isFormEditing}
                                        {...register('fees', {
                                            value: formData.fees,
                                            onChange: (e) => setFormData({...formData, fees: e.target.value})
                                        })}
                                    />
                                    <Input
                                        label="Date of Fees Submition"
                                        value={formatDateForInput(showDate)}
                                        type='date'
                                        error={error}
                                        readonly={!isFormEditing}
                                        {...register('date', {
                                            value: (formData?.date),
                                            onChange: handleDateChange
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {!regular &&
                        <div className='my-8'>
                            <h3 className='text-lg text-gray-700 font-bold font-jost'>Re-Appear in Subject Code</h3>
                            <div>
                                <div
                                    className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                    <div className=''>
                                        <Input
                                            label="Subject Code"
                                            value={formData.subjectCode}
                                            error={error || err}
                                            readonly={!isFormEditing}
                                            {...register('subjectCode', {
                                                value: formData.subjectCode,
                                                onChange: (e) => setFormData({...formData, subjectCode: e.target.value})
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {response?.success && <ShowError error={response?.message} classname='text-green-500' />}
                    {error && <ShowError error={error} />}
                    {err && <ShowError error={err} />}
                    {isEditable && !isFormEditing && <Button type='button' data='Edit Form' onClick={handleFormEditClick} />}
                    {isFormEditing && <Button type='submit' data='Save Changes' />}
                </form>
                <form onSubmit={handleSubmit(updatePrevYearData)} ref={scrollToPrevFormRef} >
                    <div className='my-8'>
                        <h3 className='text-lg text-gray-700 font-bold font-jost'>Previous Year Details</h3>
                        <div>
                            <div
                                className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className=''>
                                    <Input
                                        label="Examination"
                                        value={prevYearData?.examination}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('examination', {
                                            value: prevYearData?.examination,
                                            onChange: (e) => setPrevYearData({
                                                ...prevYearData,
                                                examination: e.target.value
                                            })
                                        })}
                                    />
                                    <Input
                                        label="University"
                                        value={prevYearData?.university}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('university', {
                                            value: prevYearData?.university,
                                            onChange: (e) => setPrevYearData({
                                                ...prevYearData,
                                                university: e.target.value
                                            })
                                        })}
                                    />
                                    <Input
                                        label="Session/Passing year"
                                        value={prevYearData?.session}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('session', {
                                            value: prevYearData?.session,
                                            onChange: (e) => setPrevYearData({...prevYearData, session: e.target.value})
                                        })}
                                    />
                                </div>
                                <div className=''>
                                    <Input
                                        label="UID/Roll Number"
                                        value={prevYearData?.auid}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('auid', {
                                            value: prevYearData?.auid,
                                            onChange: (e) => setPrevYearData({...prevYearData, auid: e.target.value})
                                        })}
                                    />
                                    {!isPrevYearFormEditing &&
                                        <Input
                                            label="Result"
                                            value="Pass"
                                            readonly={true}
                                        />
                                    }
                                    {isPrevYearFormEditing &&
                                        <Select
                                            heading="Result"
                                            options={resultOptions}
                                            value={resultValue()}
                                            onChange={(e) => setPrevYearData({...prevYearData, result: e.target.value})}
                                        />
                                    }
                                    <Input
                                        label="Obtained Marks"
                                        value={prevYearData?.marksObtained}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('marksObtained', {
                                            value: prevYearData?.marksObtained,
                                            onChange: (e) => setPrevYearData({
                                                ...prevYearData,
                                                marksObtained: e.target.value
                                            })
                                        })}
                                    />
                                    <Input
                                        label="Maximum Marks"
                                        value={prevYearData?.marksMax}
                                        error={e}
                                        readonly={!isPrevYearFormEditing}
                                        {...register('marksMax', {
                                            value: prevYearData?.marksMax,
                                            onChange: (e) => setPrevYearData({
                                                ...prevYearData,
                                                marksMax: e.target.value
                                            })
                                        })}
                                    />
                                </div>
                                <div className="flex flex-wrap">
                                    {inputFields?.map((course, index) => (
                                        <Input
                                            key={index}
                                            label={`Subject ${index + 1}`}
                                            value={course}
                                            error={e}
                                            readonly={!isPrevYearFormEditing}
                                            {...register(`coursePassed[${index}]`, {
                                                value: course,
                                                onChange: (e) => {
                                                    const newInputs = inputFields.with(index, e.target.value)
                                                    setInputFields(newInputs)
                                                },
                                            })}
                                        />
                                    ))}
                                    {isPrevYearFormEditing && (
                                        <>
                                            <Button onClick={addInputField} data="Add Subject" className={isLoading ? "bg-secondary" : ""}/>
                                            {inputFields.length > 1 &&
                                                <Button onClick={() => removeInputField(inputFields.length - 1)} data="Remove Subject" className={isLoading ? "bg-secondary" : ""}/>}
                                        </>
                                    )}
                                </div>
                                <div className=''>
                                    <Checkbox
                                        text="Have You ever been disqualified ?"
                                        checked={q1}
                                        readonly={!isPrevYearFormEditing}
                                        error={e}
                                        {...register('qus1', {
                                            value: prevYearData.qus1,
                                            onChange: (e) => {
                                                setQ1((prev) => !prev)
                                                const checkboxValue = e.target.checked ? '1' : '0';
                                                setPrevYearData({...prevYearData, qus1: checkboxValue})
                                            }
                                        })}
                                    />
                                    <Checkbox
                                        text="Are you appearing in two examinations simulatneously ?"
                                        checked={q2}
                                        readonly={!isPrevYearFormEditing}
                                        error={e}
                                        {...register('qus2', {
                                            value: prevYearData.qus2,
                                            onChange: (e) => {
                                                setQ2((prev) => !prev)
                                                const checkboxValue = e.target.checked ? '1' : '0';
                                                setPrevYearData({...prevYearData, qus2: checkboxValue})
                                            }
                                        })}
                                    />
                                    <Checkbox
                                        text="Have you applied for re-evevaluation of lower examination ?"
                                        checked={q3}
                                        readonly={!isPrevYearFormEditing}
                                        error={e}
                                        {...register('qus3', {
                                            value: prevYearData.qus3,
                                            onChange: (e) => {
                                                setQ3((prev) => !prev)
                                                const checkboxValue = e.target.checked ? '1' : '0';
                                                setPrevYearData({...prevYearData, qus3: checkboxValue})
                                            }
                                        })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {res?.success && <ShowError error={res?.message} classname='text-green-500' />}
                    {e && <ShowError error={err} />}
                    {isEditable && !isPrevYearFormEditing &&
                        <Button type='button' data='Edit Form' onClick={handlePrevYearEditClick}/>}
                    {isPrevYearFormEditing && <Button type='submit' data='Save Changes'/>}
                </form>
                <div className='my-8'>
                    <div className="relative overflow-x-auto rounded-lg shadow-xl">
                        <table className="w-full rounded-lg text-sm text-left rtl:text-right text-gray-500">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Approved By
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bg-white border-b">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Mentor
                                </th>
                                <td className={`px-6 py-4 ${getApprovedLabel(formDetails.approvedByMentor).color}`}>
                                    {getApprovedLabel(formDetails.approvedByMentor).label}
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Head of Department
                                </th>
                                <td className={`px-6 py-4 ${getApprovedLabel(formDetails.approvedByHOD).color}`}>
                                    {getApprovedLabel(formDetails.approvedByHOD).label}
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Controller
                                </th>
                                <td className={`px-6 py-4 ${getApprovedLabel(formDetails.approvedByController).color}`}>
                                    {getApprovedLabel(formDetails.approvedByController).label}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                {/*{formDetails.isEditable && <Button data="Edit Form" />}*/}
            </div>
        </div>
    );
};

export default ShowForm;