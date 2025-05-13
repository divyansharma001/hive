// src/pages/Homepage/Homepage.jsx
import React from "react";
import Content from "../Content/Content";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";

function Homepage() {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 xl:space-x-6 w-full">
      {/* Left Sidebar: User Profile & Who to Follow */}
      {user && ( // Only show sidebar if user is logged in
        <aside className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 hidden lg:block lg:sticky lg:top-[76px] h-[calc(100vh-76px)] overflow-y-auto no-scrollbar py-4 pr-2">
          {/* 76px approx Navbar height + padding. Adjust 'top' based on your Navbar's actual height. */}
          {/* no-scrollbar is a utility class you might need to add in index.css or via a plugin if scrollbar is an issue */}
          <Sidebar />
        </aside>
      )}

      {/* Main Content Area (Feed) */}
      <main className={`flex-grow w-full ${user ? 'lg:max-w-xl xl:max-w-2xl' : 'max-w-2xl'} mx-auto py-4`}>
        <Content />
      </main>

      {/* Optional Right Sidebar (e.g., Trends, Suggested Communities - not in current code) */}
      {/* {user && (
        <aside className="w-full xl:w-[280px] flex-shrink-0 hidden xl:block xl:sticky xl:top-[76px] h-[calc(100vh-76px)] overflow-y-auto no-scrollbar py-4 pl-2">
          <div className="p-4 bg-hive-dark-200 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-white mb-3">Trending</h3>
            {/* Placeholder for trends content *}
          </div>
        </aside>
      )} */}
    </div>
  );
}
/* Add to src/index.css for no-scrollbar if needed:
.no-scrollbar::-webkit-scrollbar {
    display: none;
}
.no-scrollbar {
    -ms-overflow-style: none; 
    scrollbar-width: none;  
}
*/
export default Homepage;