import {Button, Card, CardAdd, Dialog} from '../../components'
import {useSelector} from "react-redux";
import Popup from '../../components/Popup';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Examination = () => {
    const response = useSelector(state => state.form.formsData)
    const [newForm, setNewForm] = useState(false)
    console.log(newForm);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <>
            <div className='w-full flex justify-center border'>
                <div className='w-full max-w-7xl border px-3 py-8 bg-gray-100'>
                    <div className='w-[95%]'>
                        <div>
                            <h1 className='text-2xl font-semibold font-jost'>Examination Forms</h1>
                            <p>All the examination forms you filled will appear here</p>
                        </div>
                        <div className='flex flex-col *:my-5 md:flex-row md:*:mx-5 mt-7 mx-4'>
                            <CardAdd onClick={() => {setNewForm(true)}} />
                            {newForm && <Dialog />}
                            {response && response.map((form) => (
                                <Card
                                    id={form._id}
                                    href={`/home/${form._id}`}
                                    heading={form.regular ? "Regular" : "Re-appear"}
                                    date={formatDate(form.createdAt)}
                                    submittedAt={formatDate(form.updatedAt)} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Examination