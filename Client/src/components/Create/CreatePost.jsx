import React, { useState } from "react";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from "../../redux/postSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const {refresh} = useSelector(store=>store.post)


  const submitHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_POST_API_END_POINT}/create`,
        { id: user?.id, description },
        { withCredentials: true }
      );
      dispatch(getRefresh())
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      setDescription("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex flex-col p-4">
      <div className="flex">
        <img
          src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
          alt="Profile Picture"
          className="rounded-full h-20 w-20 border border-white"
        />
        <div className="pl-5 w-full">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-warning w-full h-28 text-lg"
            placeholder="What's buzzing in your mind?"
          ></textarea>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <div className="flex flex-row p-3 text-xl">
          <a href="#" className=" px-2" role="button" tabIndex="0">
            <TbPhotoSquareRounded />
          </a>
          <a href="#" className=" px-2" role="button" tabIndex="0">
            <MdOutlineLocationOn />
          </a>
          <a href="#" className=" px-2" role="button" tabIndex="0">
            <LuCalendarDays />
          </a>
        </div>
        <div>
          <button onClick={submitHandler} className="btn bg-[#FFDB00] text-black text-lg font-normal rounded-2xl">
            Buzz <img src="/buzz.png" alt="" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
