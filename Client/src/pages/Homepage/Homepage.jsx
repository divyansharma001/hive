import React from "react";
import Content from "../Content/Content";
import PeopleCard from "../../components/PeopleCard/PeopleCard";
import UserCard from "../../components/UserCard/UserCard";
import Sidebar from "../../components/Sidebar/Sidebar";

function Homepage() {
  return (
    <>
      <div>
        <div className="grid grid-cols-7 gap-4">
          <Sidebar />
          <div className="col-span-5">
            <Content />
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
