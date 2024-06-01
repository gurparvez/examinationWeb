import React from 'react'
import {logo} from "../../assets/index.js";

const Footer = () => {
    return (
        <div className="bg-primary font-jost text-gray-100 py-4 sm:px-16">
            <div className="w-full flex flex-col *:py-2 *:px-2 sm:flex-row justify-between items-center">
                <img src={logo} alt="image"/>
                <p>Copyright All Right Reserved 2023, Akal University.</p>
            </div>
        </div>
    )
}

export default Footer
