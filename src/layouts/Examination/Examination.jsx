import React, { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const Examination = () => {
    const isFormLive = useLoaderData()
    console.log(isFormLive);

    if (isFormLive === null) {
        return <h1>Something went wrong</h1>
    }
    
    return (
        <>
            {
                isFormLive.fromLive ? 
                <div>
                    Fill the examination form
                </div> : 
                
                <div>
                    Form is not available
                </div>
            }
        </>
    )
}

export default Examination