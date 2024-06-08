import React from 'react';
import { logo } from '../../assets/index.js';

const Footer = () => {
    return (
        <div className='bg-primary py-4 font-jost text-gray-100 sm:px-16'>
            <div className='flex w-full flex-col items-center justify-between *:px-2 *:py-2 sm:flex-row'>
                <img src={logo} alt='image' />
                <p>Copyright All Right Reserved 2023, Akal University.</p>
            </div>
        </div>
    );
};

export default Footer;
