import React from 'react'
import { CiLocationOn } from "react-icons/ci";

function UserCard() {
  return (
    <>
    <div>
    <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
  <figure className="px-10 pt-10">
    <img
      src="Dp.jpg"
      alt="Profile Pic"
      className="rounded-full size-24" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="text-xl font-medium -mt-6">Divyansh Sharma</h2>
    <p className='text-[#4b5359] text-sm'>@divyansharma001</p>
    <div className=' inline-flex'>
     <div className='text-[#4b5359] pt-1'> <CiLocationOn /></div>
     <div className='text-[#4b5359] px-1'>Delhi</div>
     </div>
    <p>Don't judge by this. This is still under making.</p>
    <div className="card-actions">
      <button className="btn btn-primary">View Profile</button>
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default UserCard