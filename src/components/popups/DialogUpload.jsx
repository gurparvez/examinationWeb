import { Fragment, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button, ShowError } from '../index.js';
import { api } from '../../constants/index.js';
import useApi from '../../hooks/useApi.js';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';

const DialogUpload = ({ open, onClose }) => {
    const cancelButtonRef = useRef(null);
    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [res, setRes] = useState(false);
    const dispatch = useDispatch();
    const { apiData, response, isLoading, error } =
        useApi('patchForm');

    const handleImageClick = () => {
        inputRef.current.click();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
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
            setRes(true);
            dispatch(login({ user: response.data }));
        } else {
            console.log(error);
        }
    }, [response, error]);

    return (
        <Transition.Root show={open} as={Fragment}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-faded z-50"></div> */}
            <Dialog
                as='div'
                className={`relative z-10 ${isLoading ? 'pointer-events-none bg-faded' : 'pointer-events-auto'}`}
                initialFocus={cancelButtonRef}
                onClose={() => {
                    if (!isLoading) onClose();
                }}
            >
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </Transition.Child>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <Dialog.Panel className='relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg'>
                                <div className='px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <form
                                        onSubmit={handleSubmit}
                                        className='flex flex-col items-center justify-center *:my-2 xs:my-0 xs:flex-row'
                                    >
                                        {!image && (
                                            <div
                                                onClick={handleImageClick}
                                                className={`block h-36 w-56 rounded-lg border-gray-200 bg-white shadow-xl transition-all duration-300 ease-in-out hover:scale-105 hover:bg-gray-200 xs:max-w-80`}
                                            >
                                                <div className='flex h-full w-full items-center justify-center rounded-lg border-4 border-dashed hover:border-white'>
                                                    <p className='text-6xl font-bold text-gray-400'>
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
                                        )}
                                        {image && (
                                            <>
                                                <img
                                                    src={URL.createObjectURL(
                                                        image,
                                                    )}
                                                    alt='image'
                                                    className='object-cover xs:aspect-[3/4] xs:w-56'
                                                />
                                                <div className='flex w-full items-center justify-center *:mx-2 *:my-2 sm:flex-col-reverse'>
                                                    {isLoading && (
                                                        <div>Loading...</div>
                                                    )}
                                                    {error ? (
                                                        <ShowError
                                                            error={error}
                                                        />
                                                    ) : (
                                                        response && (
                                                            <ShowError
                                                                error={
                                                                    response.message
                                                                }
                                                                classname='text-green-600'
                                                            />
                                                        )
                                                    )}
                                                    <Button
                                                        data='Cancel'
                                                        bg='bg-white'
                                                        border='border border-gray-500'
                                                        textColor='text-gray-900'
                                                        bgHover='bg-gray-300'
                                                    />
                                                    {res && (
                                                        <Button
                                                            type='button'
                                                            data='OK'
                                                            onClick={() =>
                                                                onClose()
                                                            }
                                                        />
                                                    )}
                                                    {!res && (
                                                        <Button
                                                            type='submit'
                                                            data='Update'
                                                        />
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default DialogUpload;
