import React from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../../../assets/index.js';

const AdminHeader = ({ name, role, department, program, classname }) => {
    console.log(name, role, department, program);

    const topHeading = program || department

    return (
        <div className={`sticky top-0 z-50 bg-white shadow-lg ${classname}`}>
            <nav className='flex items-center justify-between bg-gray-300 px-14 py-4'>
                <NavLink to='/admin' className='flex items-center'>
                    <img
                        src={logo}
                        alt=''
                        className='h-[40px] transition-all duration-300 ease-in-out hover:scale-105 xs:h-[50px] sm:h-full'
                    />
                </NavLink>
                <span className='text-lg font-semibold'>{topHeading}</span>
                <div className='flex space-x-5'>
                    <NavLink
                        to='/admin'
                        className='text-gray-700 hover:text-gray-900'>
                        Home
                    </NavLink>
                    <NavLink
                        to='profile'
                        className='text-gray-700 hover:text-gray-900'>
                        Profile
                    </NavLink>
                </div>
            </nav>
        </div>
    );
};

export default AdminHeader;
