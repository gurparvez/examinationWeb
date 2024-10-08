import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import useLogout from '../Hooks/useLogout.js';
import { Button } from '../../../components/index.js';

export default function Logout({
    open,
    onClose,
    svgComponent: SvgComponent = ExclamationTriangleIcon,
    svgClassName = 'text-red-600 bg-red-100',
    Heading = 'Logout !',
    para = 'Are you sure you want to logout !',
    value1 = 'Logout',
    value2 = 'Home',
    url2 = '/home',
}) {
    const cancelButtonRef = useRef(null);
    const navigate = useNavigate();
    const { mutateAsync, isPending, error } = useLogout();

    const handleLogout = async () => {
        await mutateAsync();
    };

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as='div'
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={() => {
                    onClose();
                }}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
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
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                            <Dialog.Panel className='relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg'>
                                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                                    <div className='sm:flex sm:items-start'>
                                        <div
                                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${svgClassName}`}>
                                            <SvgComponent
                                                className={`h-6 w-6`}
                                                aria-hidden='true'
                                            />
                                        </div>
                                        <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                                            <Dialog.Title
                                                as='h3'
                                                className='text-base font-semibold leading-6 text-gray-900'>
                                                {Heading}
                                            </Dialog.Title>
                                            <div className='mt-2'>
                                                <p className='text-sm text-gray-500'>
                                                    {para}
                                                </p>
                                                {error && (
                                                    <p>{error.message}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:*:mx-2 sm:flex sm:flex-row-reverse sm:px-6'>
                                    {/* TODO: use the Button component and show loading here*/}
                                    <Button
                                        type='button'
                                        data={value1}
                                        isLoading={isPending}
                                        onClick={handleLogout}
                                        className='w-full sm:w-auto'
                                    />
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                        onClick={() => navigate(url2)}
                                        ref={cancelButtonRef}>
                                        {value2}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
