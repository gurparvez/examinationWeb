import React from 'react';
import {
    Button,
    Input,
    ShowError,
} from '../../../components/index.js';
import { useForm } from 'react-hook-form';
import { useLogin } from '../Hooks/index.js';

const UserLogin = () => {
    const { register, handleSubmit } = useForm();
    const { mutateAsync, isPending, isError, error } = useLogin();

    const handleLogin = async (data) => {
        await mutateAsync({
            auid: data.auid,
            password: data.password,
        });
    };

    return (
        <div className={`${isPending} ? 'pointer-events-none' : 'pointer-events-auto'}`}>
            <h1 className='font-jost text-2xl font-semibold'>
                Akal University
            </h1>
            <p>Please login to continue</p>
            <form onSubmit={handleSubmit(handleLogin)}>
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
                                message: 'Please fill this field',
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
                    {isError && <ShowError error={error.message} />}
                </div>
                <Button
                    data='Login'
                    type='submit'
                    isLoading={isPending}
                />
            </form>
        </div>
    );
};

export default UserLogin;
