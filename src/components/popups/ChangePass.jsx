import React, {Fragment, useEffect, useRef, useState} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/24/outline'
import {FadePage, Input, ShowError} from "../index.js";
import useApi from "../../hooks/useApi.js";
import {api} from "../../constants/index.js";
import LoadingBar from "react-top-loading-bar";

export default function ChangePass({
   open,
   onClose,
   Heading="Heading",
}) {

    const cancelButtonRef = useRef(null)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPassword2, setNewPassword2] = useState("")
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(null)
    const [msg, setMsg] = useState(null)
    const {apiData, response, isLoading, progress, error} = useApi('patch');

    const handleChangePassword = async (e) => {
        e.preventDefault()
        setMsg(null)
        if (newPassword === newPassword2) {
            console.log({oldPassword, newPassword});
            await apiData(api.updatePassword, {oldPassword, newPassword});
        } else {
            setErr(true)
            setMsg("Re-entered password should match !");
        }
    }

    useEffect(() => {
        if (response && !error) {
            console.log(response)
            setSuccess(response?.message)
        }
    }, [response, error]);

    return (
        <div className={isLoading ? "pointer-events-none" : "pointer-events-auto"}>
        <div>
            <LoadingBar color='#f11946' progress={progress} />
            {isLoading && <FadePage />}
        </div>
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => {onClose();}}>
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
                                <form onSubmit={handleChangePassword}>
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div
                                                className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <LockClosedIcon className="h-6 w-6 text-red-600"
                                                                         aria-hidden="true"/>
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3"
                                                              className="text-base font-semibold leading-6 text-gray-900">
                                                    {Heading}
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <div className={`w-full *:my-2 flex-col justify-center ${success ? "hidden" : "flex"}`}>
                                                        <Input label="Old password" value={oldPassword}
                                                               onChange={e => setOldPassword(e.target.value)}
                                                               error={error}/>
                                                        <Input label="New password" value={newPassword}
                                                               onChange={e => setNewPassword(e.target.value)}
                                                               error={err || error}/>
                                                        <Input label="Re enter new password" value={newPassword2}
                                                               onChange={e => setNewPassword2(e.target.value)}
                                                               error={err || error}/>
                                                    </div>
                                                    {error && <ShowError error={error} />}
                                                    {msg && <ShowError error={msg} /> }
                                                    {success && <ShowError error={success} classname="text-green-400" /> }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            className={`${success ? "hidden":"inline-flex"} w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary sm:ml-3 sm:w-auto`}
                                        >
                                            {!success && "Update password"}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => {onClose();}}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
        </div>
    )
}
