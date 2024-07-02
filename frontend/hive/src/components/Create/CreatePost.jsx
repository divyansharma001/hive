import React from "react";

function CreatePost() {
  return (
    <>
     <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex flex-col p-4">
  <div className="flex">
    <img
      src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
      alt="Profile Picture"
      className="rounded-full h-20 w-20"
    />
    <div className="pl-5 w-full">
      <textarea
        className="textarea textarea-warning w-full h-28 text-lg"
        placeholder="What's buzzing in your mind?"
      ></textarea>
    </div>
  </div>
  
  <div className="flex justify-end mt-4">
    <button className="btn btn-primary text-lg font-normal">  Buzz <img src="./buzz.png" alt="" className="h-5 w-5" /> </button> {/* Assuming you want a button here */}
  </div>
</div>


    </>
  );
}

export default CreatePost;
