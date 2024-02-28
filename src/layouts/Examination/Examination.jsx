import axios from 'axios'
import {useEffect, useState} from 'react'
import LoadingBar from 'react-top-loading-bar'
import { api } from '../../constants'
import {Button, Card, CardAdd, FadePage} from '../../components'
import useApi from "../../API/useApi.js";

const Examination = () => {

    const [formData, setFormData] = useState(null)
    const {apiData, response, isLoading, progress, error} = useApi('get')

    useEffect(() => {
        (async () => {
            await apiData(api.allForms)
        })()
    }, [])

    useEffect(() => {
        if (response) {
            console.log(response)
            setFormData(response.data)
        }
    }, [response])

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString(); // Adjust the format as per your preference
    };

    return (
        <>
            <div className='w-full flex justify-center border'>
                {isLoading && <LoadingBar progress={progress} />}
                <div className='w-full max-w-7xl border px-3 py-8 bg-gray-100'>
                    <div className='w-[95%]'>
                        <div>
                            <h1 className='text-2xl font-semibold font-jost'>Examination Forms</h1>
                            <p>All the examination forms you filled will appear here</p>
                        </div>
                        <div className='flex flex-col *:my-5 md:flex-row md:*:mx-5 mt-7 mx-4'>
                            <CardAdd href='/home/page1'/>
                            {response && response?.data[0].forms.map((form) => (
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