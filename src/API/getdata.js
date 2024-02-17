import axios from "axios"
import { useEffect, useState } from "react"

function getdata(urlPath) {
    const [data, setdata] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                setError(false)
                const response = await axios.get(urlPath)
                console.log(response.data);
                setdata(response.data)
            } catch (error) {
                setError(true)
            } finally {
                setLoading(false)
            }
        })()

    }, [])

    return [data, loading, error]
}

export default getdata