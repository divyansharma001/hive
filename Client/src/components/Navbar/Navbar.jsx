import React from 'react';
import { GiTreeBeehive } from "react-icons/gi";
import { IoEarth } from "react-icons/io5";
import { TbMessage2Heart } from "react-icons/tb";
import { RiNotification4Line } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LuLogOut } from "react-icons/lu";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { clearUser } from '../../redux/userSlice';

function Navbar() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout`, { withCredentials: true });
      toast.success(res?.data?.message);

      // Dispatch the clearUser action to update the Redux store
      dispatch(clearUser());

      // Optionally, redirect the user to the login page
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during logout");
    }
  };

  return (
    <div className='bg-black'>
      <div className="navbar  bg-black">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a><IoEarth className='size-[15px]' /> Explore</a></li>
              <li><a><TbMessage2Heart className='size-[15px]' /> Messages</a></li>
              <li><a><RiNotification4Line className='size-[15px]'/> Notifications</a></li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl pl-5" to={'/'}><GiTreeBeehive className='size-8'/> hive</Link>
        </div>
        <div className="navbar-center pl-28 hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font">
            <li><a className='text-[15px]'><IoEarth className='size-[15px]' /> Explore</a></li>
            <li><a className='text-[15px]'><TbMessage2Heart className='size-[15px]' /> Messages</a></li>
            <li><a className='text-[15px]'><RiNotification4Line className='size-[15px]'/> Notifications</a></li>
          </ul>
        </div>

        {user ? (
          <div className="navbar-end">
            <button onClick={handleLogout} className='btn btn-ghost text-[15px] font-normal p-3 m-2'>Logout <LuLogOut /></button>
          </div>
        ) : (
          <div className="navbar-end">
            <Link to="/login" className="btn btn-ghost text-[15px] font-normal  p-3 m-2">Login</Link>
            <Link to="/signup" className="btn btn-ghost text-[15px] font-normal p-3 m-2">SignUp</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
