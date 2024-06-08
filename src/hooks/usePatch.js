import axios from 'axios';
import { useState } from 'react';

const usePatch = () => {
    const [err, setErr] = useState(null);
    const [isProgressing, setIsProgressing] = useState(null);
    const [res, setRes] = useState(null);
    const [prog, setProg] = useState(0);

    const patchData = async (url, data = null) => {
        setErr(null);
        console.log(url);
        console.log(data);
        setIsProgressing(true);
        setProg(60);

        try {
            const response = (
                await axios.patch(url, data, { withCredentials: true })
            ).data;
            setRes(response);
        } catch (error) {
            if (error.response.status === 500) {
                setErr('Some internal server error occurred !');
            } else {
                setErr(error.response.data.message);
            }
        } finally {
            setIsProgressing(false);
            setProg(100);
        }
    };

    return { patchData, res, isProgressing, prog, e: err };
};

export default usePatch;
