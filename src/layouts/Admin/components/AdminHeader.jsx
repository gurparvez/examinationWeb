import React from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../../../assets/index.js';
import formatLine from '../../../utils/formatLine.js';

const AdminHeader = ({ name, role, department, program, classname, props }) => {
    console.log(name, role, department, program);
    return <div className="sticky top-0 z-50 bg-white shadow-lg">
        <nav className="flex flex-row items-center justify-evenly px-8">
            <NavLink to='/admin' className="p-3.5">
                <img
                    src={logo}
                    alt='AUTS'
                    className='h-[40px] transition-all duration-300 ease-in-out hover:scale-105 xs:h-[50px] sm:h-full'
                />
            </NavLink>
            <span>
                {formatLine(department)}
            </span>
            <div className="hidden flex-1 list-none items-center justify-end sm:flex">
                <NavLink to='#' className="">

                </NavLink>
            </div>
        </nav>
    </div>;
};

export default AdminHeader;
