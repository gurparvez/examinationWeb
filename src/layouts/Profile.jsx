import React, { useEffect, useState } from 'react';
import { profile } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    ChangePass,
    DialogImage,
    DialogLib,
    DialogUpload,
    FadePage,
    Input,
    Logout,
    ShowError,
} from '../components';
import { useForm } from 'react-hook-form';
import useApi from '../hooks/useApi.js';
import { api } from '../constants/index.js';
import LoadingBar from 'react-top-loading-bar';
import { login } from '../store/authSlice.js';

const Profile = () => {
    const [noneEditableData, setNoneEditableData] = useState({
        auid: '',
        department: '',
        program: '',
        duration: '',
        semester: '',
        profileImage: profile,
    });
    const [editableData, setEditableData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        fatherName: '',
        motherName: '',
        address: '',
    });
    const [isEditable, setIsEditable] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    const [isPassChange, setIsPassChange] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [viewImage, setViewImage] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
    const { apiData, response, isLoading, progress, error } = useApi('patch');
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.userData);
    const userData = user.user;

    useEffect(() => {
        if (userData) {
            setNoneEditableData((prev) => ({
                ...prev,
                auid: userData.auid,
                department: userData.department?.departmentName,
                program: userData.course?.programName,
                duration: userData.course?.duration,
                semester: userData.course?.sem,
                profileImage: userData.avatar,
            }));
            setEditableData(() => ({
                fullName: userData.fullName,
                phoneNumber: userData.phoneNumber,
                email: userData.email,
                fatherName: userData.fatherName,
                motherName: userData.motherName,
                address: userData.address,
            }));
        }
    }, [userData]);

    const closeDialog = () => {
        setSuccess(false);
    };

    const closePassDialog = () => {
        setIsPassChange(false);
    };

    const closeUploadImageDialog = () => {
        setUploadImage(false);
    };

    const updateProfile = async () => {
        console.log(editableData);
        await apiData(api.updateProfile, editableData);
    };

    useEffect(() => {
        const success = response?.success;
        if (success) {
            setSuccess(true);
            setIsEditable(false);
            const { refreshToken, ...user } = response?.data;
            const msg = response.message;
            setMessage(msg);
            dispatch(login({ user: user }));
        }
    }, [response, error]);

    const handleEditProfile = () => {
        setMessage('');
        setIsEditable(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='flex w-full justify-center'>
            <LoadingBar color='#f11946' progress={progress} />
            {isLoading && <FadePage />}
            {success && (
                <DialogLib
                    open={success}
                    onClose={closeDialog}
                    Heading={message}
                    para='Your profile is successfully updated'
                    value1='Ok'
                />
            )}
            <div className='w-[100%] bg-gray-200 pb-4 shadow-2xl'>
                <div className='my-5 flex h-16 justify-center xxs:h-24 sm:h-36'>
                    <div className='relative'>
                        <img
                            src={noneEditableData.profileImage}
                            onClick={() => {
                                setViewImage(true);
                            }}
                            alt='image'
                            className='aspect-[3/4] h-full rounded-2xl border border-primary object-cover shadow-2xl'
                        />
                        {viewImage && (
                            <DialogImage
                                open={viewImage}
                                image={noneEditableData.profileImage}
                                onClose={() => setViewImage(false)}
                            />
                        )}
                        {uploadImage && (
                            <DialogUpload
                                open={uploadImage}
                                onClose={closeUploadImageDialog}
                            />
                        )}
                        <div
                            onClick={() => setUploadImage(true)}
                            className='absolute -bottom-4 -end-5 h-fit rounded-full border border-white bg-gray-300 p-2 hover:cursor-pointer xs:p-3'
                        >
                            <svg
                                className='h-fit w-5 xxs:w-8'
                                fill='#000000'
                                height='200px'
                                width='200px'
                                version='1.1'
                                id='Capa_1'
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                viewBox='0 0 487 487'
                                xmlSpace='preserve'
                                stroke='#000000'
                            >
                                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                <g
                                    id='SVGRepo_tracerCarrier'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <g>
                                        {' '}
                                        <g>
                                            {' '}
                                            <path d='M308.1,277.95c0,35.7-28.9,64.6-64.6,64.6s-64.6-28.9-64.6-64.6s28.9-64.6,64.6-64.6S308.1,242.25,308.1,277.95z M440.3,116.05c25.8,0,46.7,20.9,46.7,46.7v122.4v103.8c0,27.5-22.3,49.8-49.8,49.8H49.8c-27.5,0-49.8-22.3-49.8-49.8v-103.9 v-122.3l0,0c0-25.8,20.9-46.7,46.7-46.7h93.4l4.4-18.6c6.7-28.8,32.4-49.2,62-49.2h74.1c29.6,0,55.3,20.4,62,49.2l4.3,18.6H440.3z M97.4,183.45c0-12.9-10.5-23.4-23.4-23.4c-13,0-23.5,10.5-23.5,23.4s10.5,23.4,23.4,23.4C86.9,206.95,97.4,196.45,97.4,183.45z M358.7,277.95c0-63.6-51.6-115.2-115.2-115.2s-115.2,51.6-115.2,115.2s51.6,115.2,115.2,115.2S358.7,341.55,358.7,277.95z'></path>{' '}
                                        </g>{' '}
                                    </g>{' '}
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className='my-2 px-3 xxs:px-6'>
                    <div className='mb-5 rounded-xl border bg-white px-2 shadow-2xl xxs:px-4'>
                        <div className='mt-4'>
                            <h3 className='font-jost font-bold text-primary'>
                                About You
                            </h3>
                            <h1 className='font-jost text-3xl font-semibold'>
                                Your Profile
                            </h1>
                        </div>
                        <div className='py-3'>
                            <form onSubmit={handleSubmit(updateProfile)}>
                                <div className='my-2 w-full'>
                                    <h3 className='font-bold text-gray-500'>
                                        Personal details
                                    </h3>
                                </div>
                                <div className='rounded-b border-t border-yellow-700 bg-gray-50 *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row'>
                                    <div className=''>
                                        <Input
                                            label='Auid'
                                            value={noneEditableData.auid}
                                            error={error}
                                            readonly={true}
                                        />
                                        <Input
                                            label='Name'
                                            error={error}
                                            value={editableData.fullName}
                                            readonly={!isEditable}
                                            {...register('fullName', {
                                                value: noneEditableData.fullName,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        fullName:
                                                            e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className=''>
                                        <Input
                                            label="Father's Name"
                                            error={error}
                                            value={editableData.fatherName}
                                            readonly={!isEditable}
                                            {...register('fatherName', {
                                                value: noneEditableData.fatherName,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        fatherName:
                                                            e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                        <Input
                                            label="Mother's Name"
                                            error={error}
                                            value={editableData.motherName}
                                            readonly={!isEditable}
                                            {...register('motherName', {
                                                value: noneEditableData.motherName,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        motherName:
                                                            e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className=''>
                                        <Input
                                            label='Contact Number'
                                            error={error}
                                            value={editableData.phoneNumber}
                                            readonly={!isEditable}
                                            {...register('phoneNumber', {
                                                value: noneEditableData.phoneNumber,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        phoneNumber:
                                                            e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                        <Input
                                            label='Email'
                                            error={error}
                                            value={editableData.email}
                                            readonly={!isEditable}
                                            {...register('email', {
                                                value: noneEditableData.email,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        email: e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className=''>
                                        <Input
                                            label='Address'
                                            error={error}
                                            value={editableData.address}
                                            readonly={!isEditable}
                                            {...register('address', {
                                                value: noneEditableData.address,
                                                onChange: (e) => {
                                                    setEditableData({
                                                        ...editableData,
                                                        address: e.target.value,
                                                    });
                                                },
                                            })}
                                        />
                                    </div>
                                    <div className=''>
                                        {error ? (
                                            <ShowError error={error} />
                                        ) : message ? (
                                            <ShowError
                                                classname='text-green-600'
                                                error={message}
                                            />
                                        ) : (
                                            <ShowError />
                                        )}
                                        {isEditable && (
                                            <Button
                                                data='Save'
                                                type='submit'
                                                className={
                                                    isLoading && 'bg-secondary'
                                                }
                                            />
                                        )}
                                        {!isEditable && (
                                            <Button
                                                data={
                                                    isEditable
                                                        ? 'Save Changes'
                                                        : 'Edit Profile'
                                                }
                                                type='button'
                                                className={
                                                    isLoading
                                                        ? 'bg-secondary'
                                                        : ''
                                                }
                                                onClick={handleEditProfile}
                                            />
                                        )}
                                    </div>
                                </div>
                            </form>

                            <div className='mt-8'>
                                <div className='my-2 w-full'>
                                    <h3 className='font-bold text-gray-500'>
                                        Program details
                                    </h3>
                                </div>
                                <div
                                    className={`border-b border-t border-yellow-700 *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row ${isEditable ? 'pointer-events-none' : 'pointer-events-auto'}`}
                                >
                                    <div className=''>
                                        <Input
                                            label='Department'
                                            value={
                                                noneEditableData.department ||
                                                ''
                                            }
                                            readonly={true}
                                        />
                                        <Input
                                            label='Program'
                                            value={
                                                noneEditableData.program || ''
                                            }
                                            readonly={true}
                                        />
                                    </div>
                                    <div className=''>
                                        <Input
                                            label='Duration'
                                            value={
                                                noneEditableData.duration
                                                    ? `${noneEditableData.duration} years`
                                                    : ''
                                            }
                                            readonly={true}
                                        />
                                        <Input
                                            label='Semester'
                                            value={noneEditableData.semester}
                                            readonly={true}
                                        />
                                    </div>
                                </div>
                                <div className='mt-3 *:mx-3'>
                                    <Button
                                        data='Change Password'
                                        type='button'
                                        onClick={() => setIsPassChange(true)}
                                        className='my-2'
                                    />
                                    {isPassChange && (
                                        <ChangePass
                                            open={isPassChange}
                                            onClose={closePassDialog}
                                            Heading='Change your password'
                                        />
                                    )}
                                    <Button
                                        data='Logout'
                                        type='button'
                                        bg='bg-red-500'
                                        onClick={() => setIsLogout(true)}
                                        className='my-2'
                                    />
                                    {isLogout && (
                                        <Logout
                                            open={isLogout}
                                            onClose={() => setIsLogout(false)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
