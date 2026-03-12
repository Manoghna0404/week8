import React from 'react'
import { NavLink } from 'react-router'

function Header() {
  return (
    <div>
        <nav className='bg-gray-200 flex justify-between items-center'>
            <img src="https://marketplace.canva.com/EAFauoQSZtY/2/0/1600w/canva-brown-mascot-lion-free-logo-kAK-ljYAGXg.jpg" width="80" className='rounded-[50%]'/>
            <ul className='flex gap-5 items-center justify-around'>
                <li>
                    <NavLink to="/" className={({isActive})=>isActive?"text-blue-100 bg-blue-700 rounded-[50%] p-4":""}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="productsList" className={({isActive})=>isActive?"text-blue-100 bg-blue-700 rounded-[50%] p-4":""}>ProductsList</NavLink>
                </li>
                <li>
                    <NavLink to="contactus" className={({isActive})=>isActive?"text-blue-100 bg-blue-700 rounded-[50%] p-4":""}>Contact Us</NavLink>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header