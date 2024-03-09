import {Fragment, useEffect, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {Button, DialogImage, FadePage, ShowError} from "../index.js";
import axios from "axios";
import {api} from "../../constants/index.js";
import {NavLink} from "react-router-dom";
import useApi from '../../API/useApi.js';
import LoadingBar from 'react-top-loading-bar';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice.js';

const DialogUpload = ({
    open,
    onClose,
}) => {
    const cancelButtonRef = useRef(null)
    const inputRef = useRef(null)
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    const {apiData, response, isLoading, progress, error} = useApi('patchForm');

    const handleImageClick = () => {
        inputRef.current.click();
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log(file);
        setImage(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (image) {
            formData.append('avatar', image);
            apiData(api.updateAvatar, formData);
        }
    }

    useEffect(() => {
        if( response && !error ) {
            console.log(response);
            dispatch(login({user: response.data}));
        } else {
            console.log(error);
        }
    }, [response, error])

    return (
        <Transition.Root show={open} as={Fragment}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-faded z-50"></div> */}
            <Dialog as="div" className={`relative z-10 ${isLoading ? 'pointer-events-none bg-faded' : 'pointer-events-auto'}`} initialFocus={cancelButtonRef} onClose={() => { if(!isLoading) onClose(); }}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg">
                                <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form onSubmit={handleSubmit} className='flex flex-col xs:flex-row justify-center items-center *:my-2 xs:my-0'>
                                        {!image &&
                                            <div onClick={handleImageClick} className={`block w-56 xs:max-w-80 h-36 bg-white border-gray-200 rounded-lg shadow-xl hover:bg-gray-200 hover:scale-105 transition-all ease-in-out duration-300`}>
                                                <div className='flex justify-center items-center w-full h-full border-dashed rounded-lg border-4 hover:border-white'>
                                                    <p className='text-6xl text-gray-400 font-bold'>+</p>
                                                </div>
                                                <input
                                                    type="file"
                                                    ref={inputRef}
                                                    accept='image/*'
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                            </div>
                                        }
                                        {image &&
                                            <>
                                                <img src={URL.createObjectURL(image)} alt="image" className="xs:w-56 xs:aspect-[3/4] object-cover" />
                                                <div
                                                    className='w-full *:mx-2 *:my-2 flex sm:flex-col-reverse justify-center items-center'>
                                                    {isLoading && <div>Loading...</div>}
                                                    {error ? <ShowError error={error}/> : response && <ShowError error={response.message} classname='text-green-600' />}
                                                    <Button data='Cancel' bg='bg-white' border="border border-gray-500"
                                                            textColor="text-gray-900" bgHover="bg-gray-300"/>
                                                    <Button type="submit" data='Update'/>
                                                </div>
                                            </>
                                        }
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default DialogUpload