import axios from 'axios'
import React, { useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import { api } from '../../constants'
import { Button } from '../../components'
import { Link } from 'react-router-dom'

const Examination = () => {

    const [FormLive, setFormLive] = useState(false)
    const [checked, setChecked] = useState(false)
    const [progress, setProgress] = useState(0)

    const isFormLive = async () => {
        try {
            setProgress(progress + 60)
            const form = await (await axios.get(api.formLive)).data
            setProgress(80)
            setChecked(true)
            // setFormLive(form.data.fromLive)
            setFormLive(true)
            setProgress(100)
        } catch (error) {
            console.log("Error while fetching is-form-live: ", error);
        }
    }

  return (
    <>
    <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)} />
    <div className='flex flex-row my-10 mx-16 justify-center items-center'>
        <div className='flex flex-col items-center'>
        <h1 className='text-xl font-bold text-secondary my-3'>Fill Out the Examinations form !</h1>
        <div className='flex flex-row *:mx-4'>
            {checked ? FormLive ? <Link to="/home/page1"><Button data='Fill the Examination form' className='bg-green-800' /></Link> : <Button data='Form is not available' className='bg-red-700' /> : <Button data='Check If form is available' onClick={isFormLive} />}
        </div>
        </div>
    </div>
    </>
  )
}

export default Examination