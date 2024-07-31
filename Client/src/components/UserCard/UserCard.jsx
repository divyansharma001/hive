import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import useGetProfile from '../../hooks/useGetProfile'

function UserCard() {

  const { user, profile } = useSelector((store) => store.user);
  useGetProfile(user?.id);

  return (
    <>
    {profile?
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
     Bookmarks 
     <div className='text-white'>{profile?.bookmarks.length}</div>
    </div>
    <div className='text-[#a7acaf] px-3 pt-2'>
     Followers
     <div className='text-white'>{profile?.followers.length}</div>
    </div>
    <div className='text-[#a7acaf] px-3 pt-2'>
     Following
     <div className='text-white'>{profile?.following.length}</div>
    </div>
   </div>
  
  
  </div>
</div>
    </div> :
    
  
    <div className="flex w-80 flex-col gap-4 ml-12">
  <div className="flex items-center gap-4">
    <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
    <div className="flex flex-col gap-4">
      <div className="skeleton h-4 w-20"></div>
      <div className="skeleton h-4 w-28"></div>
    </div>
  </div>
  <div className="skeleton h-32 w-full"></div>
</div>

    }
    
    </>
  )
}

export default UserCard