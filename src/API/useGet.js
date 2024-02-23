import axios from "axios"
import { useState } from "react"

const useGet = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [response, setResponse] = useState(null)
    const [progress, setProgress] = useState(0)

    const getData = async (url) => {
        console.log(`URL: ${url}`);
        setIsLoading(true)
        setProgress(60)

        try {
            const response = (await axios.get(url)).data
            setResponse(response)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
            setProgress(100)
        }
    }

    return { getData, response, isLoading, progress, error }
}

export default useGet