import { Outlet } from 'react-router-dom';
import { profile } from './assets';
import { Loader, Header, Footer, PageNotfound } from './components';
import { api } from './constants';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useApi from './hooks/useApi.js';
import { login } from './store/authSlice.js';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { apiData, response, isLoading, error } = useApi('get');
    const dispatch = useDispatch();

    const getUser = async () => {
        await apiData(api.getUser);
    };

    const user = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
        } else {
            getUser();
        }
    }, [user]);

    useEffect(() => {
        if (!error && response?.data) {
            const { refreshToken, ...user } = response.data;
            dispatch(login({ user: user }));
        }
    }, [response]);

    const profileImage = user ? user.user.avatar : profile;

    return (
        <>
            {isLoading && <Loader />}
            <Header profileImage={profileImage} />
            {isLoggedIn ? <Outlet /> : <PageNotfound />}
            <Footer />
        </>
    );
}

export default App;
