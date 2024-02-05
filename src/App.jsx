import { Outlet, NavLink } from "react-router-dom"
import { logo, close, menu } from './assets'
import { Button } from "./components"
import { navLinks } from "./constants"
import { useState } from "react"

function App() {

  const [navMenu, setNavMenu] = useState(false)

  return (
    <>
      <div className='sticky z-50 top-0 bg-white shadow-lg'>
        <nav className='flex flex-row justify-between px-8'>
          <ul className='flex flex-row p-3.5'>
            <li className='flex items-center list-none'><NavLink to="https://auts.ac.in/" target='_blank' ><img src={logo} alt="AUTS" className="h-[40px] xs:h-[50px] sm:h-full hover:scale-105 transition-all ease-in-out duration-300" /></NavLink></li>
          </ul>
          <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
            {navLinks.map((nav, index) => (
              <li key={nav.id} className={`font-jost font-normal cursor-pointer ${index === (navLinks.length-1) ? 'mr-0' : 'mr-10'} text-[18px]`} >
                <NavLink to={`${nav.id}`} className="relative group hover:text-primary">
                  {nav.title}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250"></span>
                </NavLink>
              </li>
            ))}
            <li id='AUTS-button' className="m-10"><NavLink to="examination" ><Button data="Examination" /></NavLink></li>
            <li id="profile" className="font-jost font-normal cursor-pointer text-[18px]" ><NavLink to="profile" >Profile</NavLink></li>
          </ul>

          <div className="sm:hidden flex justify-end items-center">
            <img src={navMenu ? close : menu} alt="menu" className="w-[28px] h-[28px] object-contain" onClick={() => setNavMenu((prev) => !prev)} />
          </div>
          <div class={`transform ${navMenu ? 'flex translate-x-0': 'hidden translate-x-[100vw]'} transition-transform duration-300 ease-in-out p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl bg-gradient-to-r from-slate-400 to-slate-300`}>
            <ul className='list-none flex flex-col justify-end items-center flex-1'>
              {navLinks.map((nav, index) => (
                <li key={nav.id} className={`font-jost font-normal cursor-pointer ${index === (navLinks.length-1) ? 'mb-4' : 'mb-4'} text-[18px]`} >
                  <NavLink to={`${nav.id}`} className="relative group hover:text-primary">
                    {nav.title}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-250"></span>
                  </NavLink>
                </li>
              ))}
              <li id='AUTS-button' className="mb-4"><NavLink to="examination" ><Button data="Examination" /></NavLink></li>
              <li id="profile" className="font-jost font-normal cursor-pointer text-[18px]" ><NavLink to="profile" >Profile</NavLink></li>
            </ul>
          </div>
        </nav>
      </div>

      <Outlet />

      <div>
        Footer
      </div>
    </>
  )
}

export default App
