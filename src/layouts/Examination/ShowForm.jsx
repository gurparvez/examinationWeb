import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Button, Input} from "../../components/index.js";
import React from "react";

const YourFormComponent = () => {
    const { formId } = useParams();
    const forms = useSelector(state => state.form.formsData)
    const formDetails = forms.filter((form) => form._id === formId)[0]

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    function getTimeFromTimestamp(timestamp) {
        const dateObject = new Date(timestamp);
        let hours = dateObject.getUTCHours();
        const minutes = dateObject.getUTCMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    }

    return (
        <div className='w-full flex justify-center border-4'>
            <div className='w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl'>
                <div className='border-b-2 border-gray-800 my-2'>
                    <h1 className='text-3xl font-bold font-jost'>{formDetails.regular ? "Regular Form" : "Re-appear Form"}</h1>
                    <p className='text-sm font-semibold text-gray-600'>Created on: {formatDate(formDetails.createdAt)}, {getTimeFromTimestamp(formDetails.createdAt)}</p>
                    <p className='text-sm font-semibold text-gray-600'>Submitted on: {formatDate(formDetails.updatedAt)}, {getTimeFromTimestamp(formDetails.updatedAt)}</p>
                </div>
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Receipt Details</h3>
                    <form>
                        <div
                            className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                            <div className=''>
                                <Input
                                    label="Receipt Number"
                                    value={formDetails.receiptNumber}
                                />
                                <Input
                                    label="Fees"
                                    value={formDetails.fees}
                                />
                                <Input
                                    label="Date of Fees Submition"
                                    value={formatDate(formDetails.date)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Approved By</h3>
                    <div className='bg-gray-50 p-2 *:my-4 rounded-lg shadow-xl'>
                        <p>Mentor: {formDetails.approvedByMentor ? "Yes" : "No"}</p>
                        <p>HOD: {formDetails.approvedByHOD ? "Yes" : "No"}</p>
                        <p>Controller: {formDetails.approvedByController ? "Yes" : "No"}</p>
                    </div>
                </div>
                {formDetails.isEditable && <Button data="Edit Form" />}
            </div>
        </div>
    );
};

export default YourFormComponent;