import React from 'react'
import {NavLink} from "react-router-dom";
import {logo} from "../../assets/index.js";
import {navLinks} from "../../constants/index.js";
import {Button, Dropdown} from "../index.js";

const Header = ({ profileImage }) => {
    return (
        <div className='sticky z-50 top-0 bg-white shadow-lg'>
            <nav className='flex flex-row justify-between px-8'>
                <ul className='flex flex-row p-3.5'>
                    <li className='flex items-center list-none'><NavLink to="https://auts.ac.in/" target='_blank'><img
                        src={logo} alt="AUTS"
                        className="h-[40px] xs:h-[50px] sm:h-full hover:scale-105 transition-all ease-in-out duration-300"/></NavLink>
                    </li>
                </ul>
                <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
                    {navLinks.map((nav, index) => (
                        <li key={nav.id}
                            className={`font-jost font-normal cursor-pointer ${index === (navLinks.length - 1) ? 'mr-0' : 'mr-10'} text-[18px]`}>
                            <NavLink to={`${nav.id}`} className="relative group hover:text-primary">
                                {nav.title}
                                <span
                                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250"></span>
                            </NavLink>
                        </li>
                    ))}
                    <li id='AUTS-button' className="m-10"><NavLink to="examination"><Button
                        data="Examination"/></NavLink></li>
                    <li id="profile" className="font-jost font-normal cursor-pointer text-[18px]">
                        <NavLink to="profile">
                            <img src={profileImage} alt="profile"
                                 className="h-10 rounded-[50%] object-cover aspect-square"/>
                        </NavLink></li>
                </ul>

                <Dropdown classname="sm:hidden" profileImage={profileImage}/>
            </nav>
        </div>
    )
}

export default Header
