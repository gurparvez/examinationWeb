import React, { useState } from 'react'
import { Input } from "../components";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [auid, setAuid] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const submitForm = () => {
        let login = true
        // Logic of checking the credentials

        if (login) {
            navigate('/home');
        }
    }

    return (
        <div className='flex flex-row w-screen h-screen bg-yellow-200'>
            <div className='hidden justify-center items-center sm:flex w-1/2'>
                <img className='m-6 pl-14' src="./src/assets/2_images.png" alt="images" />
            </div>
            <div className='sm:w-1/2 w-full h-full flex justify-center items-center px-3 xxs:px-7 xs:px-14'>
                <div className='bg-white flex w-full flex-col rounded-3xl overflow-hidden'>
                    <div>
                        <div className="relative h-48 bg-primary rounded-bl-4xl">
                            <svg class="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                                <path fill="#ffffff" fill-opacity="1" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className='p-7'>
                        <h1 className='font-jost font-semibold text-2xl mb-3'>
                            Welcome back
                        </h1>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            submitForm();
                        }} className='px-5'>
                            <div className='first:mt-0 *:my-7 last:mb-0'>
                                <Input label="AUID" type='text' value={auid} setValue={setAuid} />
                                <Input label="Password" type='password' value={password} setValue={setPassword} />
                            </div>
                            <input
                                className='bg-primary text-white text-xl w-auto px-3 py-1.5 transition-all ease-in-out duration-200 hover:cursor-pointer hover:bg-secondary rounded-md'
                                type="submit"
                                name=""
                                id=""
                                value="Login"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login