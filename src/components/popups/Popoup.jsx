import React from 'react'
import Button from '../Button.jsx'

const Popoup = ({
    Heading="Pop-up",
    Content="This is a pop-up",
    ButtonData="Close",
    isPopup=true,
    setIspopup,
    className="",
}) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="max-w-52 ss:max-w-72 bg-white p-8 rounded-lg">
                <h1 className='text-3xl text-red-500 m-5'>{Heading}</h1>
                <p className='mb-2'>{Content}</p>
                <Button data={ButtonData} onClick={() => {setIspopup(false)}} />
            </div>
        </div>
    )
}

export default Popoup