import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../Content/Content'

function Homepage() {
  return (
    <>
    <div>
     <div className='grid grid-cols-7 gap-4'>
      <div className='col-span-2'><Sidebar/></div>
      <div className='col-span-5'><Content/></div>
     </div>
     </div>
     </>
  )
}

export default Homepage