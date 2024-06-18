import React, { useEffect, useState } from 'react';
import { profile } from '../../assets/index.js';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    DialogLib,
    FadePage,
    Input,
    ShowError,
} from '../../components/index.js';
import {
    ChangePass,
    DialogImage,
    DialogUpload,
    Logout,
} from './Components/index.js';
import { useForm } from 'react-hook-form';
import useApi from '../../hooks/useApi.js';
import { api } from '../../constants/index.js';
import LoadingBar from 'react-top-loading-bar';
import { login } from '../../store/authSlice.js';
import { Camera } from './SVGs/index.js';

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
        await apiData(api.updateUser, editableData);
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
                        {/* TODO: Make an Image component */}
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
                            className='absolute -bottom-4 -end-5 h-fit rounded-full border border-white bg-gray-300 p-2 hover:cursor-pointer xs:p-3'>
                            <Camera />
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

                        {/* TODO: Make form component. */}
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
                                    className={`border-b border-t border-yellow-700 *:*:my-4 *:flex *:flex-col *:py-1 sm:*:*:mx-2 sm:*:flex-row ${isEditable ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
