import React, { useEffect } from 'react';
import { profile } from '../assets/index.js';
import { Footer, Header, PageNotfound } from '../components/index.js';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (!user || user?.role === 'A') {
            navigate('/');
        }
    }, [user, navigate]);

    const profileImage = user?.avatar || profile;

    return (
        <>
            <Header profileImage={profileImage} />
            {user ? <Outlet /> : <PageNotfound />}
            <Footer />
        </>
    );
};

export default User;
