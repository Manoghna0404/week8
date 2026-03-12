import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
        <nav className='flex justify-between px-10 items-center bg-lime-200 py-5'>
           <img className="rounded-full" width="80px" src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png" alt="" />
          <ul className="flex gap-6 text-2xl">
            <li>
              <NavLink to="/" className={({isActive})=>(isActive ? "bg-lime-500 text-lime-50 rounded-xl p-2 shadow" : "")}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/add-user" className={({isActive})=>(isActive ? "bg-lime-500 text-lime-50 rounded-2xl p-2" : "")}>
                Add User
              </NavLink>
            </li>
            <li>
              <NavLink to="/users-list" className={({isActive})=> (isActive ? "bg-lime-500 text-lime-50 rounded-2xl p-2" : "")}>
                Users List
              </NavLink>
            </li>
          </ul>
        </nav>
    </div>
  )
}

export default Header