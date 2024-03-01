import React from 'react'
import Button from './Button'

const Popup = ({
    text,
    closePopup
}) => {
  return (
    <div className="fixed w-full h-full top-0 bottom-0 left-0 right-0 bg-faded">
     <div className="popup-body absolute left-[30%] right-[30%] top-[30%] bottom-[30%] text-center m-auto rounded-2xl border border-black bg-white shadow-md">
      <div className='w-full h-full flex flex-col justify-center p-5'>
        <div className='*:my-2'>
            {text}
            <Button data='Close' onClick={closePopup} />
        </div>
      </div>
     </div>
    </div>
  )
}

export default Popup