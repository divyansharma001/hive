import React from "react";
import Content from "../Content/Content";
import PeopleCard from "../../components/PeopleCard/PeopleCard";
import UserCard from "../../components/UserCard/UserCard";
import Sidebar from "../../components/Sidebar/Sidebar";

function Homepage() {
  return (
    <>
      <div>
        <div className="xl:grid xl:grid-cols-7 xl:gap-4">
          <div className="xl:col-span-2 xl:block hidden">
          <Sidebar/>
          </div>
          <div className="xl:col-span-5 xl:ml-0 md:ml-16 sm:ml-8 ml-6">
            <Content />
          </div>
        </div>
      </div>
    </>
  )
}

export default Homepage;
