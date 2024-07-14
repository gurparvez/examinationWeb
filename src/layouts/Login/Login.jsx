import React, { useState, useTransition } from 'react';
import { login_img, logo } from '../../assets/index.js';
import { AdminLogin, UserLogin } from './pages/index.js';
import { ButtonSecondary } from '../../components/index.js';

const Login = () => {
    const [isAdminTab, setIsAdminTab] = useState(false);
    const [isPending, startTransition] = useTransition();

    const changeLoginTab = (isAdmin) => {
        startTransition(() => {
            setIsAdminTab(isAdmin);
        })
    }

    return (
        <>
            <div
                className={`relative flex h-screen w-screen flex-row bg-yellow-200`}>
                <div className='absolute left-7 top-10 z-30 sm:hidden'>
                    <img src={logo} alt='logo' />
                </div>
                <div className='hidden w-1/2 items-center justify-center sm:flex'>
                    <img className='m-6 pl-14' src={login_img} alt='images' />
                </div>
                <div className='flex h-full w-full items-center justify-center px-3 xxs:px-7 xs:px-14 sm:w-1/2'>
                    <div className='flex w-full flex-col overflow-hidden rounded-3xl bg-white'>
                        <div>
                            <div className='rounded-bl-4xl relative h-48 bg-primary'>
                                <svg
                                    className='absolute bottom-0'
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 1440 320'>
                                    <path
                                        fill='#ffffff'
                                        fillOpacity='1'
                                        d='M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'></path>
                                </svg>
                            </div>
                        </div>
                        {!isAdminTab && (
                            <div className="m-12 mt-0">
                                <UserLogin />
                                <ButtonSecondary data='Login as Admin' className="mt-4" onClick={() => changeLoginTab(true)} />
                            </div>
                        )}
                        {isAdminTab && (
                            <div className="m-12 mt-0">
                                <AdminLogin />
                                <ButtonSecondary data='Login as Student' className="mt-4" onClick={() => changeLoginTab(false)} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
