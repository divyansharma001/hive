import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaReply } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import useGetPosts from "../../hooks/useGetPosts";
import { useSelector } from "react-redux";

function Post() {
  const [likedPost, setLikedPost] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [likedReply, setLikedReply] = useState(false);
  const [replyLikes, setReplyLikes] = useState(0);
  const [replies, setReplies] = useState([]);

  const {user} = useSelector((store) => store.user);

  const handlePostLike = () => {
    setLikedPost(!likedPost);
    setPostLikes(likedPost ? postLikes - 1 : postLikes + 1);
  };

  const handleReplyLike = () => {
    setLikedReply(!likedReply);
    setReplyLikes(likedReply ? replyLikes - 1 : replyLikes + 1);
  };

  useGetPosts(user?.id)
  

  return (
    <>
      <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex flex-col p-4 mt-6">
        <div className="flex">
          <div className="p-4">
            <img
              src="https://thumbs.dreamstime.com/b/cute-cat-portrait-square-photo-beautiful-white-closeup-105311158.jpg"
              alt="Profile Picture"
              className="rounded-full h-10 w-10"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-white font-normal pt-4">Divyansh Sharma</h2>
              <p className="text-[#a7acaf] text-sm font-light">@divyansharma001</p>
            </div>
            <div className="text-white pt-3 text-xl">
              All I know is that I'm loving creating this! 🤍
            </div>
            <div className="pt-3 text-[#7d8081] text-sm">
              7 minutes ago
            </div>
            <div className="pt-2 flex items-center">
              <button onClick={handlePostLike} className="focus:outline-none">
                {likedPost ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-white" />
                )}
              </button>
              <span className="ml-2 text-white">{postLikes}</span>
              <button className="focus:outline-none ml-4">
                <TbMessage2Plus className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
