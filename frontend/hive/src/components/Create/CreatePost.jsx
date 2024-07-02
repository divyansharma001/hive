import React from "react";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { RiAttachment2 } from "react-icons/ri";

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
          <div className="flex flex-row p-3 text-xl">
          <a href="" className=" px-2">
          <TbPhotoSquareRounded />
          </a>
          <a href="" className=" px-2">
          <MdOutlineLocationOn />
          </a>
          <a href="" className=" px-2">
            <LuCalendarDays />
          </a>
          <a href="" className=" px-2">
            <RiAttachment2 />
          </a>
          </div>
          <div>
          <button className="btn bg-[#FFDB00] text-black text-lg font-normal rounded-2xl">
            {" "}
            Buzz <img src="./buzz.png" alt="" className="h-5 w-5" />{" "}
          </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
