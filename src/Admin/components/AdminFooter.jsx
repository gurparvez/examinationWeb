import React from 'react';
import { logo } from '../../assets/index.js';
import { NavLink } from 'react-router-dom';

const AdminFooter = ({ name, role, department, program, classname }) => {
    const roles = {
        A: 'Admin',
        h: 'HOD',
        m: 'Mentor',
        c: 'Controller',
    };

    const endLine = `${roles[role] || 'No Role'} (${program || department})`;

    return (
        <footer
            className={`flex items-center justify-between bg-gray-300 px-4 sm:px-14 py-4 ${classname}`}>
            <NavLink to='/admin' className='flex items-center'>
                <img
                    src={logo}
                    alt=''
                    className='h-[40px] transition-all duration-300 ease-in-out hover:scale-105 xs:h-[50px] sm:h-full'
                />
            </NavLink>
            <NavLink
                to='profile'
                className='flex flex-col text-gray-700 hover:text-gray-900'>
                <p>{name}</p>
                <p>{endLine}</p>
            </NavLink>
        </footer>
    );
};

export default AdminFooter;
