import React, { Suspense } from "react";
import UserCard from "../UserCard/UserCard";

import { lazy } from "react";
import PeopleCardSkeleton from "../Skeletons/PeopleCardSkeleton.jsx";

const PeopleCard = lazy(()=> import('../PeopleCard/PeopleCard.jsx'))

function Sidebar() {
  return (
    <div className='col-span-2'>
    <UserCard/>
    <div className='pt-7'>
      <Suspense fallback={<PeopleCardSkeleton/>}>
    <PeopleCard/>
    </Suspense>
    </div>
    
  </div>
  );
}

export default Sidebar;
