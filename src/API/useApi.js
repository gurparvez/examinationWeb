import axios from "axios"
import { useState } from "react"

const useApi = (type) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [response, setResponse] = useState(null)
    const [progress, setProgress] = useState(0)

    const apiData = async (url, data=null) => {
        console.log(`URL: ${url}, data: ${data}`);
        setIsLoading(true)
        setProgress(60)

        try {
            let res = null;
            switch (type) {
                case 'post':
                    res = (await axios.post(url, data)).data
                    break;
                case 'get':
                    res = (await axios.get(url)).data
                    break;
                default:
                    break;
            }
            setResponse(res)
            console.log(`The response came is: ${res} and the response returned is ${response}`);
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
            setProgress(100)
        }
    }

    return { apiData, response, isLoading, progress, error }
}

export default useApi