import axios from "axios"
import { useState } from "react"

const usePost = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [response, setResponse] = useState(null)
    const [progress, setProgress] = useState(0)

    const postData = async (url, data) => {
        console.log(`URL: ${url}, data: ${data}`);
        setIsLoading(true)
        setProgress(60)

        try {
            const response = (await axios.post(url, data)).data
            setResponse(response)
        } catch (error) {
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
            setProgress(100)
        }
    }

    return { postData, response, isLoading, progress, error }
}

export default usePost