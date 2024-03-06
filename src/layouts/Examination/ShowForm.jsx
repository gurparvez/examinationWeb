import {useParams} from 'react-router-dom';
import {useSelector} from "react-redux";
import {Button, Checkbox, Input} from "../../components/index.js";
import React from "react";

const ShowForm = () => {
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
            <form className='w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl'>
                <div className='border-b-2 border-gray-800 my-2'>
                    <h1 className='text-3xl font-bold font-jost'>{formDetails.regular ? "Regular Form" : "Re-appear Form"}</h1>
                    <p className='text-sm font-semibold text-gray-600'>Created
                        on: {formatDate(formDetails.createdAt)}, {getTimeFromTimestamp(formDetails.createdAt)}</p>
                    <p className='text-sm font-semibold text-gray-600'>Submitted
                        on: {formatDate(formDetails.updatedAt)}, {getTimeFromTimestamp(formDetails.updatedAt)}</p>
                </div>
                <div className='my-8'>
                    <h3 className='text-lg text-gray-700 font-bold font-jost'>Receipt Details</h3>
                    <div>
                        <div
                            className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                            <div className=''>
                                <Input
                                    label="Receipt Number"
                                    value={formDetails.receiptNumber}
                                    readonly={true}
                                />
                                <Input
                                    label="Fees"
                                    value={formDetails.fees}
                                    readonly={true}
                                />
                                <Input
                                    label="Date of Fees Submition"
                                    value={formatDate(formDetails.date)}
                                    readonly={true}
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
                                {formDetails?.prevYearData?.coursePassed.map((course, index) => (
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
                                <td className={`px-6 py-4 ${formDetails.approvedByMentor ? "text-green-500" : "text-red-700"}`}>
                                    {formDetails.approvedByMentor ? "Yes" : "No"}
                                </td>
                            </tr>
                            <tr className="bg-white border-b">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Head of Department
                                </th>
                                <td className={`px-6 py-4 ${formDetails.approvedByHOD ? "text-green-500" : "text-red-700"}`}>
                                    {formDetails.approvedByHOD ? "Yes" : "No"}
                                </td>
                            </tr>
                            <tr className="bg-white">
                                <th scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    Controller
                                </th>
                                <td className={`px-6 py-4 ${formDetails.approvedByController ? "text-green-500" : "text-red-700"}`}>
                                    {formDetails.approvedByController ? "Yes" : "No"}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                {/*{formDetails.isEditable && <Button data="Edit Form" />}*/}
            </form>
        </div>
    );
};

export default ShowForm;