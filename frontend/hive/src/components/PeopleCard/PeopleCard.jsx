import React from "react";
import { IoAddSharp } from "react-icons/io5";

const details = [
  {
    profilePic:
      "https://vectorseek.com/wp-content/uploads/2023/02/OpenAI-Logo-Vector.jpg",
    name: "Open Ai",
    userName: "@OpenAi",
  },
  {
    profilePic:
      "https://cdn.vox-cdn.com/thumbor/nBEbhF6OktWUWqR3cCmuRNPgOD8=/0x0:179x167/1200x0/filters:focal(0x0:179x167)/cdn.vox-cdn.com/uploads/chorus_asset/file/4019454/googlelogo.0.jpg",
    name: "Google",
    userName: "@Google",
  },
  {
    profilePic:
      "https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png",
    name: "Twitter",
    userName: "@Twitter",
  },
];

function PeopleCard() {
  return (
    <>
      <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
        <div className="card-body  ">
          <h2 className="font-semibold text-xl items-center text-center">Who to follow</h2>

          <div className="flex pt-2">
            <div> 
              <img
                src="https://cdn.vox-cdn.com/thumbor/nBEbhF6OktWUWqR3cCmuRNPgOD8=/0x0:179x167/1200x0/filters:focal(0x0:179x167)/cdn.vox-cdn.com/uploads/chorus_asset/file/4019454/googlelogo.0.jpg"
                alt=""
                className="size-14 rounded-full"
              />
            </div>
              
              <div >
            <div className="font-semibold ml-3">
              Google
            </div>
            <div className="text-[#a7acaf] pl-3 text-sm">
              @Google
            </div>
            </div>
               

               <div className="mt-1 ml-6 ">
               <button className="btn btn-outline w-24">FOLLOW</button>
               </div>
           
          </div>

        {/* doing this temporaily */}

        <div className="flex pt-2">
            <div> 
              <img
                src="https://vectorseek.com/wp-content/uploads/2023/02/OpenAI-Logo-Vector.jpg"
                alt=""
                className="size-14 rounded-full"
              />
            </div>
              
              <div >
            <div className="font-semibold ml-3">
            Open Ai
            </div>
            <div className="text-[#a7acaf] pl-3 text-sm">
              @OpenAi
            </div>
            </div>
               

               <div className="mt-1 ml-6 ">
               <button className="btn btn-outline w-24">FOLLOW</button>
               </div>
           
          </div>

          <div className="flex pt-2">
            <div> 
              <img
                src="https://www.freepnglogos.com/uploads/twitter-x-logo-png/twitter-x-logo-png-9.png"
                alt=""
                className="size-14 rounded-full"
              />
            </div>
              
              <div >
            <div className="font-semibold ml-3">
             Twitter 
            </div>
            <div className="text-[#a7acaf] pl-3 text-sm">
              @TwitterX
            </div>
            </div>
               

               <div className="mt-1 ml-6 ">
               <button className="btn btn-outline w-24">FOLLOW</button>
               </div>
           
          </div>



        </div>
      </div>
    </>
  );
}

export default PeopleCard;
