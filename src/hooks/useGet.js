import axios from 'axios';
import { useState } from 'react';

const useGet = () => {
    const [err, setErr] = useState(null);
    const [isProgressing, setIsProgressing] = useState(null);
    const [res, setRes] = useState(null);
    const [prog, setProg] = useState(0);

    const getData = async (url) => {
        setErr(null);
        console.log(`URL: ${url}`);
        setIsProgressing(true);
        setProg(60);

        try {
            const response = (await axios.get(url, { withCredentials: true }))
                .data;
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

    return { getData, res, isProgressing, prog, err };
};

export default useGet;
