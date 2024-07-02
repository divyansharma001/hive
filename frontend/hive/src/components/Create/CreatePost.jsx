import React from "react";

function CreatePost() {
  return (
    <>
      <div className="bg-[rgb(15,16,18)] w-11/12 h-52 rounded-xl flex p-4 pl-8">
        <div className="">
          <img
            src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
            alt="Profile Picture"
            className="rounded-full h-20 w-20"
          />
        </div>
        <div className="pl-5 w-11/12">
          <textarea
            className="textarea textarea-warning w-11/12 h-28 text-lg"
            placeholder="What's buzzing in your mind?"
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
