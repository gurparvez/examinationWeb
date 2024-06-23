import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminFooter, AdminHeader } from './components/index.js';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    // if (!user || user?.role !== 'A') {
    //     console.log("navigating to /");
    //     navigate('/');
    // } else {
    //     console.log("not navigating to /");
    // }

    // Debug log to check user state
    console.log('Current user:', user);

    useEffect(() => {
        console.log("No dependencies effect");
    }, []);

    // TODO: useEffect does not trigger on reload! Why ?
    useEffect(() => {
        console.log("useEffect triggered");
        if (!user) {
            navigate('/');
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
