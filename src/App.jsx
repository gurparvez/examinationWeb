import { Outlet, NavLink, Link } from "react-router-dom"
import { logo, profile, notFound2 } from './assets'
import {Button, Dropdown} from "./components"
import { navLinks } from "./constants"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false)
  
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    if (user) {
      setIsLoggedin(true);
    }
  }, [user]);

  const profileImage = user ? user.user.avatar : profile

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
            <li id="profile" className="font-jost font-normal cursor-pointer text-[18px]" >
              <NavLink to="profile" >
                <img src={profileImage} alt="profile" className="h-10 rounded-[50%] object-cover aspect-square" />
              </NavLink></li>
          </ul>

          <Dropdown classname="sm:hidden" profileImage={profileImage} />
        </nav>
      </div>

      {isLoggedin ? <Outlet /> : 
      <div className="flex flex-col sm:flex-row mx-5 my-6 justify-center">
        <div className="w-[100%] sm:w-[70%]">
          <img src={notFound2} alt="error: 404"  />
        </div>
        <div className="flex flex-col justify-center items-center sm:w-[30%] w-[100%] p-8">
          <div className="*:my-4 sm:*:m-4">
            <h1 className="text-4xl sm:text-6xl font-bold">Whoops! That Page is Gone</h1>
            <p>The link you clicked may be broken or the page may have been removed. You can try to login again or get back to the home page.</p>
            <Link to="/"><Button data="Login" className="text-xl" /></Link>
          </div>
        </div>
      </div>}

      <div>
        Footer
      </div>
    </>
  )
}

export default App
