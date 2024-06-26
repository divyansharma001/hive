import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Content from '../Content/Content'
import PeopleCard from '../../components/PeopleCard/PeopleCard'

function Homepage() {
  return (
    <>
    <div>
     <div className='grid grid-cols-7 gap-4'>
      <div className='col-span-2'>
        <Sidebar/>
        <div className='pt-7'>
        <PeopleCard/>
        </div>
      </div>
      <div className='col-span-5'><Content/></div>
     </div>
     </div>
     </>
  )
}

export default Homepage