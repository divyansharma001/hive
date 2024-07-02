import React from "react";

function Post() {
  return (
    <>
      <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex p-4 mt-6">
        <div className="p-4 ">
          <img
            src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
            alt="Profile Picture"
            className="rounded-full h-10 w-10"
          />
        </div>
        <div className="flex">
        <div>
            <h2 className="text-white font-normal pt-4">Divyansh Sharma</h2>
            <p className="text-[#a7acaf] text-sm ">@divyansharma001</p>
        </div>
        <div className="pt-5 text-[#7d8081] text-sm p-5">
           7 minutes ago
        </div>
        </div>
      </div>
    </>
  );
}

export default Post;
