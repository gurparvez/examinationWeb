import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { api } from '../constants';
import { login } from '../store/authSlice';
import { login_img } from '../assets';
import LoadingBar from 'react-top-loading-bar'
import { Button, Input, ShowError, FadePage } from '../components/';
import usePost from '../API/usePost';

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm()
    const {postData, response, isLoading, progress, error} = usePost();

    const handleLogin = async (data) => {
        await postData(api.login, data);
        if (!error) {
            console.log(response);
            const {accessToken, refreshToken, ...user} = response?.data;
            dispatch(login(user));
            navigate('/home')
        } else {
            console.log(error);
        }
    }

    return (
        <>
        <div className={`relative flex flex-row w-screen h-screen bg-yellow-200 ${isLoading ? 'pointer-events-none':'pointer-events-auto'}`}>
            <LoadingBar color='#f11946' progress={progress} />
            {isLoading && <FadePage />}
            <div className='hidden justify-center items-center sm:flex w-1/2'>
                <img className='m-6 pl-14' src={login_img} alt="images" />
            </div>
            <div className='sm:w-1/2 w-full h-full flex justify-center items-center px-3 xxs:px-7 xs:px-14'>
                <div className='bg-white flex w-full flex-col rounded-3xl overflow-hidden'>
                    <div>
                        <div className="relative h-48 bg-primary rounded-bl-4xl">
                            <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#ffffff" fillOpacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className='p-7'>
                        <h1 className='font-jost font-semibold text-2xl mb-3'>
                            Welcome back
                        </h1>
                        <form onSubmit={handleSubmit(handleLogin)} className='sm:px-2'>
                            <div className='mb-4 *:my-8'>
                                <Input 
                                label="AUID" 
                                type='text' 
                                className={`my-7 ${error ? 'border-red-500' : ''}`}
                                error={error}
                                readonly={isLoading}
                                {...register("auid", {
                                    required: true,
                                    matchPatren: (value) => /^\d{9}$/.test(value) || "Please provide a valid AUID !"
                                })} />

                                <Input 
                                label="Password" 
                                type='password' 
                                className={`mt-7`}
                                error={error}
                                readonly={isLoading}
                                {...register("password", {
                                    required: true,
                                    matchPatren: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/.test(value) || "Password must contain atleast 1 uppercase, 1 lowercase, 1 sepcial character and atleast 8 characters long !"
                                })} />

                            </div>
                            <div className='w-full mb-4'>
                                {error ? <ShowError error={error} /> : <ShowError />}
                            </div>
                            <Button data='Login' type='submit' className={isLoading ? "bg-secondary" : ""} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login