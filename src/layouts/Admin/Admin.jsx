import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AdminFooter, AdminHeader } from './components/index.js';
import { useSelector } from 'react-redux';

const Admin = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.userData);

    useEffect(() => {
        if (user === null) {
            navigate('/');
        }
    }, [user, navigate]);



    return (
        <div>
            <AdminHeader name={user.fullName} role={user.role} department={user.department?.departmentName} program={user.course?.programName || null} />
            <Outlet />
            <AdminFooter />
        </div>
    );
};

export default Admin;
