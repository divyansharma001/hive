import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../Content/Content'

function Homepage() {
  return (
    <>
    <div className="w-full h-screen bg-gray-800 text-orange-500">
     <div className='grid grid-cols-12 gap-4'>
      <div className='col-span-2'><Sidebar/></div>
      <div className='col-span-10'><Content/></div>
     </div>
     </div>
     </>
  )
}

export default Homepage