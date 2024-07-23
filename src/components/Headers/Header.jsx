import React from 'react';
import { NavLink } from 'react-router-dom';
import { logo } from '../../assets/index.js';
import { navLinks } from '../../constants/index.js';
import { Button, SideBar } from '../index.js';

const Header = ({ profileImage }) => {
    return (
        <div className='sticky top-0 z-50 bg-white shadow-lg'>
            <nav className='flex flex-row justify-between px-8'>
                <ul className='flex flex-row p-3.5'>
                    <li className='flex list-none items-center'>
                        <NavLink to='/user'>
                            <img
                                src={logo}
                                alt='AUTS'
                                className='h-[40px] transition-all duration-300 ease-in-out hover:scale-105 xs:h-[50px] sm:h-full'
                            />
                        </NavLink>
                    </li>
                </ul>
                <ul className='hidden flex-1 list-none items-center justify-end sm:flex'>
                    {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`cursor-pointer font-jost font-normal ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-[18px]`}
                        >
                            <NavLink
                                to={`${nav.id}`}
                                className='group relative hover:text-primary'
                            >
                                {nav.title}
                                <span className='duration-250 absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-primary transition-transform group-hover:scale-x-100'></span>
                            </NavLink>
                        </li>
                    ))}
                    <li id='AUTS-button' className='m-10'>
                        <NavLink to='examination'>
                            <Button data='Examination' />
                        </NavLink>
                    </li>
                    <li
                        id='profile'
                        className='cursor-pointer font-jost text-[18px] font-normal'
                    >
                        <NavLink to='profile'>
                            <img
                                src={profileImage}
                                alt='profile'
                                className='aspect-square h-10 rounded-[50%] object-cover'
                            />
                        </NavLink>
                    </li>
                </ul>

                <SideBar classname='sm:hidden' profileImage={profileImage} />
            </nav>
        </div>
    );
};

export default Header;
