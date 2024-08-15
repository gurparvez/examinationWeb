import React, { useEffect, useState } from 'react';
import { Button, DialogLib, Input } from '../../../components';
import { useSelector } from 'react-redux';
import { profile } from '../../../assets/index.js';
import { NavLink } from 'react-router-dom';

const Page1 = ({ regular = true }) => {
    const [click, setClick] = useState(false);
    const [data, setData] = useState({
        auid: '',
        department: '',
        program: '',
        duration: '',
        semester: '',
        profileImage: profile,
        fullName: '',
        phoneNumber: '',
        email: '',
        fatherName: '',
        motherName: '',
        address: '',
    });
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            auid: userData.auid,
            department: userData.department?.departmentName,
            program: userData.course?.programName,
            duration: userData.course?.duration,
            semester: userData.course?.sem,
            profileImage: userData.avatar,
            fullName: userData.fullName,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            fatherName: userData.fatherName,
            motherName: userData.motherName,
            address: userData.address,
        }));
    }, [userData]);

    return (
        <>
            {click && (
                <DialogLib
                    open={click}
                    onClose={() => setClick(false)}
                    Heading='Cannot make Changes Here !'
                    para="If you wish to make changes in your personal details, you have to do it in 'Profile'"
                    value1='Profile'
                    url1='/user/profile'
                    value2='Cancel'
                    url2='/user/examination'
                />
            )}
            <div className='flex w-full justify-center'>
                <div className='my-5 w-[95%] rounded border-2 bg-gray-200 p-3 drop-shadow-xl'>
                    <div className='my-2 border-b-2 border-gray-800'>
                        <h1 className='font-jost text-3xl font-bold'>
                            {regular ? 'Regular' : 'Re-Appear'}
                        </h1>
                    </div>
                    <div onClick={() => setClick(true)} className='my-8'>
                        <h3 className='font-jost text-lg font-bold text-gray-700'>
                            Personal Details
                        </h3>
                        <div className='flex flex-col-reverse items-center *:my-3 sm:flex-row sm:*:mx-4'>
                            <div className='w-full grow'>
                                <div className='w-full rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2'>
                                    <div className='*:pr-3'>
                                        <Input
                                            label='AUID'
                                            value={data.auid}
                                            readonly={true}
                                        />
                                        <Input
                                            label='Name'
                                            value={data.fullName}
                                            readonly={true}
                                        />
                                        <Input
                                            label='Address'
                                            value={data.address}
                                            readonly={true}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='h-full w-64 grow-0'>
                                <img src={data.profileImage} alt='' />
                            </div>
                        </div>
                        <div className='my-8'>
                            <div className='rounded-lg bg-gray-50 px-2 shadow-xl *:*:my-4 *:flex *:flex-col *:py-1 sm:mx-4 sm:*:*:mx-2 sm:*:flex-row'>
                                <div className=''>
                                    <Input
                                        label="Father's Name"
                                        value={data.fatherName}
                                        readonly={true}
                                    />
                                    <Input
                                        label="Mother's Name"
                                        value={data.motherName}
                                        readonly={true}
                                    />
                                    <Input
                                        label='Phone Number'
                                        value={data.phoneNumber}
                                        readonly={true}
                                    />
                                </div>
                                <div className=''>
                                    <Input
                                        label='Email'
                                        value={data.email}
                                        readonly={true}
                                    />
                                    <Input
                                        label='Department'
                                        value={data.department}
                                        readonly={true}
                                    />
                                    <Input
                                        label='Program'
                                        value={data.program}
                                        readonly={true}
                                    />
                                </div>
                                <div className=''>
                                    <Input
                                        label='duration'
                                        value={data.duration}
                                        readonly={true}
                                    />
                                    <Input
                                        label='semester'
                                        value={data.department}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mx-5 flex w-[95%] justify-end'>
                        <NavLink
                            to={
                                regular
                                    ? '/user/regular/page2'
                                    : '/user/reappear/page2'
                            }
                        >
                            <Button className='' data='Next' />
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page1;
