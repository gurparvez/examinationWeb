import { useQuery } from '@tanstack/react-query';
import user from './API/User.js';
import { Loader, PageNotfound } from './components/index.js';
import { useNavigate } from 'react-router-dom';
import { login } from './store/authSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("On /");
    }, [])

    const { data, isFetching, isSuccess, isError } = useQuery({
        queryKey: ['user'],
        queryFn: user.getUser,
        retry: 2,
    });

    if (isFetching) {
        return <Loader />;
    }
    if (isError) {
        navigate('/login');
    }

    if (isSuccess) {
        console.log(data?.data.role === 'A');
        dispatch(login(data.data));
        const isAdmin = data?.data.role === 'A';
        if (isAdmin) navigate('/admin');
        else navigate('/user');
    }

    return <PageNotfound />;
}

export default App;
