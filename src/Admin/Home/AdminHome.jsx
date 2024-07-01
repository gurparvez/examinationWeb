import React, { useState } from 'react';
import { Button, Checkbox } from '../../components/index.js';
import { useNavigate } from 'react-router-dom';
import { getApprovedLabel } from '../../utils/index.js';

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
            status: 0,
        },
        {
            _id: 2,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: -1,
        },
        {
            _id: 3,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 0,
        },
        {
            _id: 4,
            date: '2024-03-13T00:00:00.000Z',
            auid: 22,
            name: 'Naresh Kumar',
            course: 'BCA',
            department: 'CSE',
            type: 'regular',
            status: 1,
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
        navigate(`/admin/${formId}`);
    };

    const handleSelectAll = () => {
        if (selected.length === forms.length) {
            setSelected([]);
        } else {
            setSelected([]);
            forms.map((form) => {
                setSelected((prev) => [...prev, form._id]);
            });
        }
    };

    return (
        <div className='overflow-x-scroll p-4 sm:p-7'>
            <table className='table min-w-full divide-y'>
                <thead>
                    <tr>
                        <th className='px-6 py-3'>
                            <Checkbox
                                text=''
                                className='border-none'
                                checked={selected.length === forms.length}
                                onChange={handleSelectAll}
                            />
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
                        <tr
                            key={form._id}
                            className='cursor-pointer hover:bg-gray-200'
                            onClick={() => {
                                handleFormClick(form._id);
                            }}>
                            <td className='px-6 py-3'>
                                <Checkbox
                                    text=''
                                    checked={selected.includes(form._id)}
                                    onChange={() =>
                                        handleCheckboxChange(form._id)
                                    }
                                    onClick={(event) => {event.stopPropagation();}}
                                    className='border-none'
                                />
                            </td>
                            <td className='px-6 py-3'>{form.auid}</td>
                            <td className='px-6 py-3'>{form.date}</td>
                            <td className='px-6 py-3'>{form.name}</td>
                            <td className='px-6 py-3'>{form.course}</td>
                            <td className='px-6 py-3'>{form.department}</td>
                            <td className='px-6 py-3'>{form.type}</td>
                            {form.status === 0 ? (
                                <td className='px-6 py-3'>
                                    <Button
                                        bg='bg-green-600'
                                        data='Approve'
                                        className='mr-1'
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            console.log(form);
                                        }}
                                    />
                                    <Button
                                        bg='bg-red-600'
                                        data='Reject'
                                        className='ml-1'
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            console.log(form);
                                        }}
                                    />
                                </td>
                            ) : (
                                <td
                                    className={`px-6 py-3 ${getApprovedLabel(form.status).color}`}>
                                    {getApprovedLabel(form.status).label}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={`w-full my-3 *:mx-2 ${selected.length > 0 ? '' : 'invisible'}`}>
                <Button data='Approve' bg='bg-green-600' />
                <Button data='Reject' bg='bg-red-600' />
            </div>
        </div>
    );
};
export default AdminHome;
