import React from 'react';
import { useForm } from 'react-hook-form';
import { login_img, logo } from '../../assets/index.js';
import { Button, ButtonSecondary, Input, ShowError } from '../../components/index.js';
import useLogin from './Hooks/useLogin.js';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { mutateAsync, isPending, isError, error } = useLogin();

    const handleLogin = async (data) => {
        await mutateAsync({
            auid: data.auid,
            password: data.password,
        });
    };

    return (
        <>
            <div
                className={`relative flex h-screen w-screen flex-row bg-yellow-200 ${isPending} ? 'pointer-events-none' : 'pointer-events-auto'}`}>
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
                        <div className='p-7'>
                            <h1 className='font-jost text-2xl font-semibold'>
                                Akal University
                            </h1>
                            <p>Please login to continue</p>
                            <form
                                onSubmit={handleSubmit(handleLogin)}
                                className='sm:px-2'>
                                <div className='mb-4 *:my-8'>
                                    <Input
                                        label='AUID'
                                        type='text'
                                        className={`my-7 ${isError ? 'border-red-500' : ''}`}
                                        error={error}
                                        readonly={isPending}
                                        {...register('auid', {
                                            required: {
                                                value: true,
                                                message:
                                                    'Please fill this field',
                                            },
                                            maxLength: 9,
                                        })}
                                    />

                                    <Input
                                        label='Password'
                                        type='password'
                                        className={`my-7 ${isError ? 'border-red-500' : ''}`}
                                        error={error}
                                        readonly={isPending}
                                        {...register('password', {
                                            required: true,
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/,
                                                message:
                                                    'Password must contain at least 1 uppercase, 1 lowercase, 1 special character and at least 8 characters long !',
                                            },
                                        })}
                                    />
                                </div>
                                <div className='mb-4 w-full'>
                                    {isError && (
                                        <ShowError error={error.message} />
                                    )}
                                </div>
                                <div className="*:mx-2">
                                    <Button
                                        data='Login'
                                        type='submit'
                                        isLoading={isPending}
                                        className={isPending ? 'bg-secondary' : ''}
                                    />
                                    <ButtonSecondary data="Login as Admin" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
