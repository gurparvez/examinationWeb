import { useEffect, useRef, useState } from 'react';
import { Button, ShowError } from '../../../components/index.js';
import { api } from '../../../constants/index.js';
import useApi from '../../../hooks/useApi.js';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/authSlice.js';

const DialogUpload = ({ open, onClose }) => {
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [isResponse, setIsResponse] = useState(false);
    const dispatch = useDispatch();
    const { apiData, response, isLoading, error } = useApi('patchForm');

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('avatar', image);
            apiData(api.updateAvatar, formData);
        }
    };

    useEffect(() => {
        if (response && !error) {
            setIsResponse(true);
            dispatch(login({ user: response.data }));
        }
    }, [response, error, dispatch]);

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <>
            {open && (
                <div
                    className={`fixed inset-0 z-10 flex items-end justify-center p-4 transition-opacity duration-300 ease-in-out sm:items-center sm:p-0 ${
                        open ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={handleClose}>
                    {/* Overlay that catches clicks outside the modal */}
                    <div
                        className='fixed inset-0 bg-gray-500 bg-opacity-75'
                        onClick={handleClose}
                    />

                    <div className='relative z-20 w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:scale-100'>
                        <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                            <form
                                onSubmit={handleSubmit}
                                className='flex flex-col items-center justify-center'>
                                {!image ? (
                                    <div
                                        onClick={handleImageClick}
                                        className={`block h-36 w-56 rounded-lg border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 xs:max-w-80`}>
                                        <div className='flex h-full w-full items-center justify-center rounded-lg border-4 border-dashed hover:border-white'>
                                            <p className='select-none text-6xl font-bold text-gray-400'>
                                                +
                                            </p>
                                        </div>
                                        <input
                                            type='file'
                                            ref={inputRef}
                                            accept='image/*'
                                            onChange={handleImageChange}
                                            className='hidden'
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div className='flex w-full flex-col items-center *:my-3'>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt='Selected'
                                                className='rounded-xl border-4 object-cover xs:aspect-[3/4] xs:w-56'
                                            />
                                            {isLoading && <div>Loading...</div>}
                                            {error && (
                                                <ShowError error={error} />
                                            )}
                                            {isResponse && (
                                                <ShowError
                                                    error={response.message}
                                                    className='text-green-600'
                                                />
                                            )}
                                        </div>
                                        <div className='flex w-full items-center justify-center'>
                                            {isResponse ? (
                                                <Button
                                                    type='button'
                                                    data='OK'
                                                    onClick={onClose}
                                                    className='px-8'
                                                />
                                            ) : (
                                                <div className='flex w-full justify-between *:mx-3 xs:justify-end'>
                                                    <Button
                                                        data='Cancel'
                                                        bg='bg-white'
                                                        border='border border-gray-500'
                                                        textColor='text-gray-900'
                                                        bgHover='bg-gray-300'
                                                        onClick={onClose}
                                                    />
                                                    <Button
                                                        type='submit'
                                                        data='Update'
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DialogUpload;
