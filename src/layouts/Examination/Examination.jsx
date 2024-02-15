import axios from 'axios'
import React, { useState } from 'react'
import { api } from '../../constants'

const Examination = () => {

    const [FormLive, setFormLive] = useState(false)

    const isFormLive = async () => {
        try {
            const form = await (await axios.get(api.formLive)).data
            console.log(form);
            console.log(form.data.fromLive)
            setFormLive(form.data.fromLive)
        } catch (error) {
            console.log("Error while fetching is-form-live: ", error);
        }
    }

  return (
    <div onClick={isFormLive}>Examination</div>
  )
}

export default Examination