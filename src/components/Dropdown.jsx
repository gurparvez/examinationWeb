import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Bars3Icon } from '@heroicons/react/20/solid'
import { navButtons, navLinks } from "../constants/index.js";
import { NavLink } from "react-router-dom";
import { Button } from "./index.js";
import { profile } from "../assets/index.js";

const Dropdown = ({
    navs=navLinks,
    buttons=navButtons,
    profileImage=profile,
    classname=""
}) => {

    return (
        <div className={`fixed top-4 right-4 w-fit text-right ${classname}`}>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-white focus:outline-none">
                        <Bars3Icon
                            className="h-7 w-10 text-black"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 translate-x-full"
                    enterTo="transform opacity-100 translate-x-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="transform opacity-100 translate-x-0"
                    leaveTo="transform opacity-0 translate-x-full"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-fit origin-top-right divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black/5 focus:outline-none">
                        <div className="flex flex-col items-center px-3 py-1 *:my-2">
                            {navs.map((nav) => (
                                <Menu.Item>
                                    <NavLink to={`${nav.id}`} className="relative group hover:text-primary">
                                        {nav.title}
                                        <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250"></span>
                                    </NavLink>
                                </Menu.Item>
                            ))}
                            {buttons.map((button) => (
                                <Menu.Item>
                                    <NavLink to={`${button.id}`} >
                                        <Button data={`${button.title}`} />
                                    </NavLink>
                                </Menu.Item>
                            ))}
                            <Menu.Item>
                                <NavLink to="profile" >
                                    <img src={profileImage} alt="profile" className="h-10 rounded-[50%] object-cover aspect-square" />
                                </NavLink>
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default Dropdown