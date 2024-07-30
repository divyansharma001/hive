import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import useGetProfile from '../../hooks/useGetProfile'

function UserCard() {

  const { user, profile } = useSelector((store) => store.user);
  useGetProfile(user?.id);


  return (
    <>
    <div>
    <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
  <figure className="px-10 pt-10">
    <img
      src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
      alt="Profile Pic"
      className="rounded-full h-24 w-24" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="text-xl font-medium -mt-6">{profile?.name}</h2>
    <p className='text-[#a7acaf] text-sm pb-1'>@{profile?.username}</p>
    <div className=' inline-flex'>
     <div className='text-[#a7acaf] pt-1'> <CiLocationOn /></div>
     <div className='text-[#a7acaf] px-1'>Delhi, India</div>
     </div>
    <p className='text-[#a7acaf] pb-3'>Don't judge by this. This is still under making.</p>
   
   <div className='flex'>
    <div className='text-[#a7acaf] px-3 pt-2'>
     Posts
     <div className='text-white'>5</div>
    </div>
    <div className='text-[#a7acaf] px-3 pt-2'>
     Followers
     <div className='text-white'>27</div>
    </div>
    <div className='text-[#a7acaf] px-3 pt-2'>
     Following
     <div className='text-white'>18</div>
    </div>
   </div>
  
  
  </div>
</div>
    </div>
    </>
  )
}

export default UserCard