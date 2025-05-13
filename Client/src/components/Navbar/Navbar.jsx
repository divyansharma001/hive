import React from 'react';
import { GiTreeBeehive } from "react-icons/gi";
import { IoEarth } from "react-icons/io5";
import { TbMessage2Heart } from "react-icons/tb";
import { RiNotification4Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg"; // Import profile icon
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
      dispatch(clearUser());
      toast.success(res?.data?.message || "Logged out successfully");
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const handleProfileClick = () => {
    // This should ideally navigate to a dedicated profile page
    // For now, it can be a placeholder or open UserProfileModal if you adapt it
    if(user) {
      // navigate(`/profile/${user.username}`); // Example route
      toast.info("Profile view coming soon!");
    }
  };

  return (
    <div className='bg-hive-black shadow-lg sticky top-0 z-50 border-b border-hive-gray-dark'>
      <div className="navbar container mx-auto px-2 sm:px-4">
        <div className="navbar-start">
          {user && ( // Show hamburger only if logged in and on mobile
            <div className="dropdown lg:hidden">
              <label tabIndex={0} role="button" className="btn btn-ghost text-hive-gold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-hive-dark-200 rounded-lg shadow-xl z-[1] mt-3 w-56 p-2 text-gray-200">
                <li><button onClick={handleProfileClick} className='w-full justify-start text-base py-2'><CgProfile className='size-5 mr-2 text-hive-gold' /> My Profile</button></li>
                <div className="divider my-0 h-[1px] bg-hive-gray-dark"></div>
                <li><Link to="/" className='text-base py-2'><IoEarth className='size-5 mr-2 text-hive-gold' /> Explore</Link></li>
                <li><a className='text-base py-2'><TbMessage2Heart className='size-5 mr-2 text-hive-gold' /> Messages</a></li>
                <li><a className='text-base py-2'><RiNotification4Line className='size-5 mr-2 text-hive-gold'/> Notifications</a></li>
                <div className="divider my-0 h-[1px] bg-hive-gray-dark"></div>
                <li><button onClick={handleLogout} className='w-full justify-start text-red-500 hover:bg-red-500 hover:text-white text-base py-2'><LuLogOut className='size-5 mr-2'/> Logout</button></li>
              </ul>
            </div>
          )}
          <Link className="btn btn-ghost text-xl md:text-2xl text-hive-gold items-center normal-case" to={'/'}>
            <GiTreeBeehive className='size-7 md:size-8'/>
            <span className="ml-1 font-semibold hidden sm:inline">hive</span>
          </Link>
        </div>

        {user && ( // Show center links only if logged in
            <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 font-medium text-gray-300 space-x-1">
                <li><Link to="/" className='hover:bg-hive-dark-100 hover:text-hive-gold rounded-md text-sm px-3 py-2 flex items-center'><IoEarth className='size-5 mr-1.5' /> Explore</Link></li>
                <li><a className='hover:bg-hive-dark-100 hover:text-hive-gold rounded-md text-sm px-3 py-2 flex items-center'><TbMessage2Heart className='size-5 mr-1.5' /> Messages</a></li>
                <li><a className='hover:bg-hive-dark-100 hover:text-hive-gold rounded-md text-sm px-3 py-2 flex items-center'><RiNotification4Line className='size-5 mr-1.5'/> Notifications</a></li>
            </ul>
            </div>
        )}

        <div className="navbar-end">
          {user ? (
            <div className="hidden lg:flex items-center space-x-3">
              <button onClick={handleLogout} className='btn btn-ghost btn-sm text-gray-300 hover:bg-red-700 hover:text-white font-normal normal-case'>
                  <LuLogOut size={18}/> Logout
              </button>
              <button onClick={handleProfileClick} className="tooltip tooltip-bottom" data-tip="Profile">
                <div className="avatar">
                    <div className="w-9 h-9 rounded-full ring-2 ring-hive-gold ring-offset-base-100 ring-offset-2 hover:opacity-80 transition-opacity">
                        <img src={user.profile_picture || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"} alt="profile" />
                    </div>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login" className="btn btn-ghost btn-sm text-gray-300 hover:bg-hive-dark-100 hover:text-hive-gold font-normal normal-case">Login</Link>
              <Link to="/signup" className="btn btn-sm bg-hive-gold hover:bg-yellow-400 text-black font-semibold px-4 normal-case rounded-md">SignUp</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;