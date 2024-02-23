import axios from 'axios'
import { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { api } from '../../constants'
import { Button, FadePage } from '../../components'
import { Link } from 'react-router-dom'

const Examination = () => {

    const [FormLive, setFormLive] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [progress, setProgress] = useState(0)

    const isFormLive = async () => {
        try {
            setLoading(true)
            setProgress(progress + 60)
            const form = await (await axios.get(api.formLive)).data
            setProgress(80)
            setChecked(true)
            setFormLive(form.data.fromLive)
            // setFormLive(true)
            setProgress(100)
        } catch (error) {
            console.log("Error while fetching is-form-live: ", error);
        }
        finally {
            setLoading(false)
        }
    }

  return (
    <>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
    {loading && <FadePage />}
    <div className={`flex flex-row py-10 px-16 justify-center items-center bg-home ${loading ? 'pointer-events-none':'pointer-events-auto'}`}>
        <div className='flex flex-col items-center'>
        <h1 className='text-xl font-bold text-secondary my-3'>Fill Out the Examinations Form</h1>
        <div className='flex flex-row *:mx-4'>
            {
                checked ? 
                    FormLive ? 
                        <Link to="/home/page1"><Button data='Fill the Examination form' bg='bg-green-800' /></Link> 
                        : 
                        <Link to="/home"><Button data='Form is not available' bg='bg-red-700' /></Link> 
                    :
                    <Button data='Check If form is Available' onClick={isFormLive} className={loading && "bg-secondary"} />
            }
        </div>
        </div>
    </div>
    </>
  )
}

export default Examination