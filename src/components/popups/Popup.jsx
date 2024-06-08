import React from 'react';
import Button from '../Button.jsx';

const Popup = ({ text, closePopup }) => {
    return (
        <div className='fixed bottom-0 left-0 right-0 top-0 h-full w-full bg-faded'>
            <div className='popup-body absolute bottom-[30%] left-[30%] right-[30%] top-[30%] m-auto rounded-2xl border border-black bg-white text-center shadow-md'>
                <div className='flex h-full w-full flex-col justify-center p-5'>
                    <div className='*:my-2'>
                        {text}
                        <Button data='Close' onClick={closePopup} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;
