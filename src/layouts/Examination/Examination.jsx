import { Card, CardAdd, DialogLib, Loader } from '../../components';
import { useState } from 'react';
import { AcademicCapIcon } from '@heroicons/react/24/outline';
import { useGetAllForms } from './Hooks/index.js';

// FIXME: test this component and api calls
const Examination = () => {
    const [newForm, setNewForm] = useState(false);

    const { data, isSuccess, isError, isLoading, error } = useGetAllForms();
    const forms = data?.data;
    // const isFormLive = useSelector(state => state.auth.userData.user.formLive)
    const isFormLive = true;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const closeDialog = () => {
        setNewForm(false);
    };

    return (
        <>
            <div className='flex w-full justify-center border'>
                <div className='w-full max-w-7xl border bg-gray-100 px-3 py-8'>
                    <div className='flex w-[95%] flex-col justify-center'>
                        <div>
                            <h1 className='font-jost text-2xl font-semibold'>
                                Examination Forms
                            </h1>
                            <p>
                                All the examination forms you filled will appear
                                here
                            </p>
                        </div>
                        <div className='mx-4 mt-7 flex w-full flex-wrap justify-center text-center *:my-5 ss:flex-row ss:*:mx-4'>
                            {isFormLive && (
                                <CardAdd
                                    key='cardAdd'
                                    onClick={() => setNewForm(true)}
                                    classname='w-64 *:w-full'
                                />
                            )}
                            {newForm && (
                                <DialogLib
                                    svgComponent={AcademicCapIcon}
                                    svgClassName='text-green-600 bg-green-100'
                                    Heading='Choose the Type of Examination'
                                    para='Select exam type: Regular for new, Re-appear for any previous year pending re-appears.'
                                    open={newForm}
                                    onClose={closeDialog}
                                    value1='Regular'
                                    url1='/home/regular/page1'
                                    value2='Re Appear'
                                    url2='/home/reappear/page1'
                                />
                            )}
                            {isLoading ? (
                                <div>
                                    <Loader />
                                </div>
                            ) : (
                                isError && (
                                    <div className='text-red-700'>
                                        There is an error on our end while
                                        getting your forms !
                                    </div>
                                )
                            )}
                            {data &&
                                forms.map((form) => (
                                    <Card
                                        id={form._id}
                                        href={`/home/${form._id}`}
                                        heading={
                                            form.regular
                                                ? 'Regular'
                                                : 'Re-appear'
                                        }
                                        recpt={form.receiptNumber}
                                        submittedAt={formatDate(form.updatedAt)}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Examination;
