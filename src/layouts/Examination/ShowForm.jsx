import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Button, Checkbox, FadePage, Input, ShowError} from "../../components/index.js";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import useApi from '../../API/useApi.js';
import LoadingBar from 'react-top-loading-bar';
import { api } from '../../constants/index.js';
import { put } from '../../store/formSlice.js';
import { format } from 'date-fns';

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
    })
    const [showDate, setShowDate] = useState(Date.now())
    const [err, setErr] = useState(null)
    const { formId } = useParams();
    const forms = useSelector(state => state.form.formsData)
    const formDetails = forms.filter((form) => form._id === formId)[0]
    const regular = formDetails.regular
    const isEditable = formDetails?.isEditable
    const [isFormEditing, setIsFormEditing] = useState(false)
    const {apiData, response, isLoading, progress, error} = useApi('patch');
    const {register, handleSubmit} = useForm()
    const dispatch = useDispatch();

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
                auid: formDetails.auid,
                examination: formDetails.examination,
                university: formDetails.university,
                session: formDetails.session,
                result: formDetails.result,
                marksMax: formDetails.marksMax,
                marksObtained: formDetails.marksObtained,
                coursePassed: formData.coursePassed
            }))
        }
    }, [formDetails])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    };

    const formatDateForInput = (date) => {
        console.log("Date to be Formatted(from formDetails): ", formData?.date);
        console.log("Date to be Formatted(from showDate): ", date);
        const dateObj = new Date(date);
        console.log("Date converted to Date object: ", dateObj);
        return format(new Date(dateObj), 'yyyy-MM-dd');
    }

    const handleDateChange = (e) => {
        setErr(null)
        const dateChanged = new Date(e.target.value)
        if (dateChanged <= Date.now()) {
            setFormData({...formData, date: e.target.value})
            setShowDate(e.target.value)
        } else {
            setErr(`Date needs to be less than or equall to ${formatDate(Date.now())} !`)
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

    const updateFormData = async () => {
        formData._id = formId;
        if (!err) await apiData(api.updateForm, formData);
    }

    useEffect(() => {
        if (response && !error) {
            setIsFormEditing(false)
            const newFormDetails = forms.map((form) => form._id === formId ? response.data : form)
            dispatch(put(newFormDetails));
        }
    }, [response, error])

    return (
        <div className='w-full flex justify-center border-4'>
            <LoadingBar height={3} progress={progress} />
            {isLoading && <FadePage />}
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
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Previous Year Details</h3>
                    <div>
                        <div
                            className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                            <div className=''>
                                <Input
                                    label="Examination"
                                    value={formDetails?.prevYearData?.examination}
                                    readonly={true}
                                />
                                <Input
                                    label="University"
                                    value={formDetails?.prevYearData?.university}
                                    readonly={true}
                                />
                                <Input
                                    label="Session/Passing year"
                                    value={formDetails?.prevYearData?.session}
                                    readonly={true}
                                />
                            </div>
                            <div className=''>
                                <Input
                                    label="UID/Roll Number"
                                    value={formDetails?.prevYearData?.auid}
                                    readonly={true}
                                />
                                <Checkbox
                                    text="Pass"
                                    className="w-full"
                                    checked={true}
                                    readonly={true}
                                />
                                <Input
                                    label="Obtained Marks"
                                    value={formDetails?.prevYearData?.marksObtained}
                                    readonly={true}
                                />
                                <Input
                                    label="Maximum Marks"
                                    value={formDetails?.prevYearData?.marksMax}
                                    readonly={true}
                                />
                            </div>
                            <div className="flex flex-wrap">
                                {formDetails?.prevYearData?.coursePassed?.map((course, index) => (
                                    <Input
                                        key={index}
                                        label={`Course ${index+1}`}
                                        value={course}
                                        readonly={true}
                                    />
                                ))}
                                {/*<Button onClick={addInputField} data="Add Subject"/>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='my-8'>
                    {/*<h3 className='text-lg text-gray-700 font-bold font-jost'>Approved By</h3>*/}
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