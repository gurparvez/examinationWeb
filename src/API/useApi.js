import axios from "axios"
import { useState} from "react"

const useApi = (type) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [response, setResponse] = useState(null)
    const [progress, setProgress] = useState(0)

    const apiData = async (url, data=null) => {
        console.log(url);
        console.log(data);
        setIsLoading(true)
        setProgress(60)

        try {
            let res = null;
            switch (type) {
                case 'post':
                    res = (await axios.post(url, data, { withCredentials: true })).data
                    break;
                case 'get':
                    res = (await axios.get(url, { withCredentials: true })).data
                    break;
                default:
                    break;
            }
            setResponse(res)
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