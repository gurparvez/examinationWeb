import React, {useEffect, useState} from 'react'
import {Button, DialogLib, Input} from '../../../components'
import {useSelector} from "react-redux";
import {profile} from "../../../assets/index.js";
import {NavLink} from "react-router-dom";

const Page1 = ({
    regular=true
}) => {
    const [click, setClick] = useState(false)
    const [data, setData] = useState({
        auid: '',
        department: '',
        program: '',
        duration: '',
        semester: '',
        profileImage: profile,
        fullName: "",
        phoneNumber: "",
        email: '',
        fatherName: '',
        motherName: '',
        address: '',
    })
    const user = useSelector(state => state.auth.userData);
    const userData = user.user

    useEffect(() => {
        setData(prev => ({
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
        }))
    }, [userData])

  return (
    <>
        {click && <DialogLib open={click} onClose={() => setClick(false)} Heading="Cannot make Changes Here !" para="If you wish to make changes in your personal details, you have to do it in 'Profile'" value1="Profile" url1="/home/profile" value2="Cancel" url2="/home/examination" />}
        <div className="w-full flex justify-center">
            <div className="w-[95%] my-5 p-3 border-2 bg-gray-200 rounded drop-shadow-xl">
                <div className='border-b-2 border-gray-800 my-2'>
                    <h1 className='text-3xl font-bold font-jost'>Regular</h1>
                </div>
                <div onClick={() => setClick(true)} className="my-8">
                    <h3 className="text-lg text-gray-700 font-bold font-jost">Personal Details</h3>
                    <div className="flex flex-col-reverse sm:flex-row items-center *:my-3 sm:*:mx-4">
                        <div className="grow w-full">
                            <div className='bg-gray-50 w-full *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
                                <div className='*:pr-3'>
                                    <Input
                                        label="AUID"
                                        value={data.auid}
                                        readonly={true}
                                    />
                                    <Input
                                        label="Name"
                                        value={data.fullName}
                                        readonly={true}
                                    />
                                    <Input
                                        label="Address"
                                        value={data.address}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-64 grow-0">
                            <img src={data.profileImage} alt=""/>
                        </div>
                    </div>
                    <div className="my-8">
                        <div
                            className='bg-gray-50 *:*:my-4 *:flex *:flex-col sm:*:flex-row *:py-1 sm:mx-4 sm:*:*:mx-2 px-2 rounded-lg shadow-xl'>
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
                                    label="Phone Number"
                                    value={data.phoneNumber}
                                    readonly={true}
                                />
                            </div>
                            <div className=''>
                                <Input
                                    label="Email"
                                    value={data.email}
                                    readonly={true}
                                />
                                <Input
                                    label="Department"
                                    value={data.department}
                                    readonly={true}
                                />
                                <Input
                                    label="Program"
                                    value={data.program}
                                    readonly={true}
                                />
                            </div>
                            <div className=''>
                                <Input
                                    label="duration"
                                    value={data.duration}
                                    readonly={true}
                                />
                                <Input
                                    label="semester"
                                    value={data.department}
                                    readonly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-[95%] flex justify-end mx-5 ">
                    <NavLink to={regular ? '/home/regular/page2' : '/home/reappear/page2'} ><Button className="" data="Next" /></NavLink>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page1