import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminFooter, AdminHeader } from './components/index.js';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    // Debug log to check user state
    console.log('Current user:', user);

    useEffect(() => {
        console.log("No dependencies effect");
    }, []);

    // TODO: useEffect does not triggers on reload! Why ?
    useEffect(() => {
        console.log("useEffect triggered");
        if (user === null) {
            console.log('User is null, navigating to /');
            navigate('/');
        } else {
            console.log('User is not null, staying on admin page');
        }
    }, [user]);

    return (
        <div>
            <AdminHeader
                name={user?.fullName}
                role={user?.role}
                department={user?.department?.departmentName}
                program={user?.course?.programName || null}
            />
            <Outlet />
            <AdminFooter />
        </div>
    );
};

export default Admin;
