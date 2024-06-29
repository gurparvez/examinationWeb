import React, { useState } from 'react';
import { Checkbox } from '../../components/index.js';
import { useNavigate } from 'react-router-dom';

const AdminHome = () => {
    const [selected, setSelected] = useState([]);
    const navigate = useNavigate();
    console.log(selected);

    const forms = [
        {
            _id: 1,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 'pending',
        },
        {
            _id: 2,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 'pending',
        },
        {
            _id: 3,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 'pending',
        },
        {
            _id: 4,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 'pending',
        },
    ];

    const handleCheckboxChange = (formId) => {
        setSelected((prevCheckedForms) => {
            if (prevCheckedForms.includes(formId)) {
                return prevCheckedForms.filter((id) => id !== formId);
            } else {
                return [...prevCheckedForms, formId];
            }
        });
    };

    const handleFormClick = (formId) => {
        navigate(`/admin/${formId}`)
    }

    const handleSelectAll = () =>  {}

    return (
        <div className='overflow-x-scroll p-4 sm:p-7'>
            <table className='table min-w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3'>
                            <Checkbox text='' className='border-none' />
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            auid
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Date
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Name
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Course
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Department
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Type
                        </th>
                        <th className='px-6 py-3 text-start font-medium uppercase text-gray-500'>
                            Approve/Reject
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {forms.map((form) => (
                        <tr key={form._id} className='hover:bg-gray-200 cursor-pointer' onClick={() => {handleFormClick(form._id)}}>
                            <td className='px-6 py-3'>
                                <Checkbox
                                    text=''
                                    checked={selected.includes(form._id)}
                                    onChange={() =>
                                        handleCheckboxChange(form._id)
                                    }
                                    className='border-none'
                                />
                            </td>
                            <td className='px-6 py-3'>{form.auid}</td>
                            <td className='px-6 py-3'>{form.date}</td>
                            <td className='px-6 py-3'>{form.name}</td>
                            <td className='px-6 py-3'>{form.course}</td>
                            <td className='px-6 py-3'>{form.department}</td>
                            <td className='px-6 py-3'>{form.type}</td>
                            <td className='px-6 py-3'>
                                {/* You can add Approve/Reject buttons or status here */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AdminHome;
