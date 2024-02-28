import axios from "axios"
import { useState } from "react"

const useGet = () => {
    const [err, setErr] = useState(null)
    const [isProgressing, setIsProgressing] = useState(null)
    const [res, setRes] = useState(null)
    const [prog, setProg] = useState(0)

    const getData = async (url) => {
        console.log(`URL: ${url}`);
        setIsProgressing(true)
        setProg(60)

        try {
            const response = (await axios.get(url)).data
            setRes(response)
        } catch (error) {
            setErr(error.response.data.message)
        } finally {
            setIsProgressing(false)
            setProg(100)
        }
    }

    return { getData, res, isProgressing, prog, err }
}

export default useGet