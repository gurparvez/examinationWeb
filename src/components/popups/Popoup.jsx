import React from 'react';
import Button from '../Button.jsx';

const Popoup = ({
    Heading = 'Pop-up',
    Content = 'This is a pop-up',
    ButtonData = 'Close',
    isPopup = true,
    setIspopup,
    className = '',
}) => {
    // TODO: isPopup and className not used. Use them
    return (
        <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50'>
            <div className='max-w-52 rounded-lg bg-white p-8 ss:max-w-72'>
                <h1 className='m-5 text-3xl text-red-500'>{Heading}</h1>
                <p className='mb-2'>{Content}</p>
                <Button
                    data={ButtonData}
                    onClick={() => {
                        setIspopup(false);
                    }}
                />
            </div>
        </div>
    );
};

export default Popoup;
