import React from 'react';
import { notFound2 } from '../assets/index.js';
import { Link } from 'react-router-dom';
import { Button } from './index.js';

const PageNotfound = () => {
    return (
        <div className='mx-5 my-6 flex flex-col justify-center sm:flex-row'>
            <div className='w-[100%] sm:w-[70%]'>
                <img src={notFound2} alt='error: 404' />
            </div>
            <div className='flex w-[100%] flex-col items-center justify-center p-8 sm:w-[30%]'>
                <div className='*:my-4 sm:*:m-4'>
                    <h1 className='text-4xl font-bold sm:text-6xl'>
                        Whoops! That Page is Gone
                    </h1>
                    <p>
                        The link you clicked may be broken or the page may have
                        been removed. You can try to login again or get back to
                        the home page.
                    </p>
                    <Link to='/'>
                        <Button data='Login' className='text-xl' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotfound;
