import React from 'react'
import { GiTreeBeehive } from "react-icons/gi";
import { IoEarth } from "react-icons/io5";
import { TbMessage2Heart } from "react-icons/tb";
import { RiNotification4Line } from "react-icons/ri";

function Navbar() {
  return (
    <>
    <div className='bg-black'>
    <div className="navbar  bg-black">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    
    <a className="btn btn-ghost text-xl pl-5"><GiTreeBeehive className='size-8'/> hive</a>
  </div>
  <div className="navbar-center pl-28 hidden lg:flex">
    <ul className="menu menu-horizontal px-1 font">
      <li><a className='text-[15px]'> <IoEarth className='size-[15px]' /> Explore</a></li>
      <li>
        <a className='text-[15px]'><TbMessage2Heart className='size-[15px]' /> Messages</a> 
      </li>
      <li><a className='text-[15px]'><RiNotification4Line className='size-[15px]'/> Notifications</a></li>
    </ul>
  </div>
  <div className="navbar-end">
  <a className="btn btn-ghost text-[15px] font-normal  p-3 m-2">Login</a>
  <a className="btn btn-ghost text-[15px] font-normal p-3 m-2">SignUp</a>
  </div>
</div>
    </div>
    </>
  )
}

export default Navbar