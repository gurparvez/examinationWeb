import {Button, Card, CardAdd, Dialog, DialogLib, Loader} from '../../components'
import {useSelector} from "react-redux";
import Popup from '../../components/popups/Popup.jsx';
import {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import useApi from "../../API/useApi.js";
import {api} from "../../constants/index.js";
import {put} from "../../store/formSlice.js";

const Examination = () => {

    const [err, setErr] = useState("")
    const {apiData, response, isLoading, progress, error} = useApi('get');
    const res = useSelector(state => state.form.formsData)
    const [newForm, setNewForm] = useState(false)
    // const isFormLive = useSelector(state => state.auth.userData.user.formLive)
    const isFormLive = true

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const closeDialog = () => {
        setNewForm(false);
    };

    useEffect(() => {
        async function fetchData(){
            await apiData(api.allForms)
        }
        if (!res) {
            fetchData()
        }
    }, [])

    useEffect(() => {
        if (response && !error) {
            dispatch(put(response.data[0].forms))
        }
        if (error) {
            setErr("Cannot get the forms !")
        }
    }, [response, error]);

    return (
        <>
            <div className='w-full flex justify-center border'>
                <div className='w-full max-w-7xl border px-3 py-8 bg-gray-100'>
                    <div className='w-[95%]'>
                        <div>
                            <h1 className='text-2xl font-semibold font-jost'>Examination Forms</h1>
                            <p>All the examination forms you filled will appear here</p>
                        </div>
                        <div className='flex flex-col flex-wrap *:my-5 ss:flex-row ss:*:mx-4 mt-7 mx-4'>
                            {isFormLive && <CardAdd key="cardAdd" onClick={() => setNewForm(true)}/>}
                            {newForm && <DialogLib open={newForm} onClose={closeDialog}/>}
                            {isLoading ? <div><Loader /></div> :
                                err && <div className="text-red-700">There is an error on our end while getting your forms !</div>
                            }
                            {res && res.map((form) => (
                                <Card
                                    id={form._id}
                                    href={`/home/${form._id}`}
                                    heading={form.regular ? "Regular" : "Re-appear"}
                                    date={formatDate(form.createdAt)}
                                    submittedAt={formatDate(form.updatedAt)}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Examination