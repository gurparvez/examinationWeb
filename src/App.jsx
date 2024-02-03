import { Outlet, NavLink } from "react-router-dom"

function App() {

  return (
    <>
      <div className='sticky z-50 top-0 bg-white shadow-lg'>
        <div className='navbar'>
          <ul className='flex flex-row p-3.5'>
            <li className='list-none px-6'><NavLink to="https://auts.ac.in/" target='_blank' ><img src="https://auts.ac.in/wp-content/uploads/2023/06/webpage-auts-logo-1June23.png" alt="AUTS" /></NavLink></li>
          </ul>
          <ul className='sidebar-container navbarAnchors'>
            <li><NavLink to="/home" className="no-underline text-gray-900 text-sm transition-all ease-in-out" >Home</NavLink></li>
            <li><NavLink to="courses" >Your Courses</NavLink></li>
            <li id='AUTS-button'><NavLink to="examination" >Examination</NavLink></li>
            <li><NavLink to="profile" >Profile</NavLink></li>
          </ul>
        </div>
      </div>

      <Outlet />

      <div>
        Footer
      </div>
    </>
  )
}

export default App
