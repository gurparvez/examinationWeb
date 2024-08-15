import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminFooter, AdminHeader } from './components/index.js';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    // if (!user || !user?.isAdmin) {
    //     console.log("navigating to /");
    //     navigate('/');
    // } else {
    //     console.log("not navigating to /");
    // }

    useEffect(() => {
        // TODO: check if the user is admin or not
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
            <AdminFooter
                name={user?.fullName}
                role={user?.role}
                department={user?.department?.departmentName}
                program={user?.course?.programName || null}
            />
        </div>
    );
};

export default Admin;
