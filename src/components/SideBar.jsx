import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { navButtons, navLinks } from '../constants/index.js';
import { NavLink } from 'react-router-dom';
import { Button } from './index.js';
import { profile } from '../assets/index.js';

const SideBar = ({
    navs = navLinks,
    buttons = navButtons,
    profileImage = profile,
    classname = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className={`fixed right-4 top-4 w-fit text-right ${classname}`}>
            <button
                className='inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none'
                onClick={toggleDropdown}>
                <Bars3Icon className='h-7 w-10 text-black' aria-hidden='true' />
            </button>

            <div
                className={`fixed inset-0 flex transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 transform' : 'translate-x-full transform'}`}>
                <div className='h-full w-1/4' onClick={closeDropdown} />
                <div className='relative h-full w-3/4 transform bg-gray-200 transition-transform duration-300 ease-in-out'>
                    <button
                        className='absolute right-4 top-4 z-10 rounded-md px-4 py-2 text-sm font-medium text-black focus:outline-none'
                        onClick={closeDropdown}>
                        <XMarkIcon className='h-7 w-7' aria-hidden='true' />
                    </button>
                    <div className='flex h-full flex-col items-center justify-between pb-8 pt-16'>
                        <div className='flex flex-col items-center'>
                            {navs.map((nav) => (
                                <NavLink
                                    key={nav.id}
                                    to={`${nav.id}`}
                                    className='group relative my-2 py-1 hover:text-primary'
                                    onClick={closeDropdown}>
                                    {nav.title}
                                    <span className='duration-250 absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 transform bg-primary transition-transform group-hover:scale-x-100'></span>
                                </NavLink>
                            ))}
                            <NavLink to='profile' onClick={closeDropdown}>
                                <div className='flex items-center *:mx-2'>
                                    <span>Profile</span>
                                    <img
                                        src={profileImage}
                                        alt='profile'
                                        className='my-2 aspect-square h-10 rounded-[50%] object-cover'
                                    />
                                </div>
                            </NavLink>
                        </div>
                        {buttons.map((button) => (
                            <NavLink
                                key={button.id}
                                to={`${button.id}`}
                                onClick={closeDropdown}>
                                <Button
                                    data={`${button.title}`}
                                    className='w-full'
                                />
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
