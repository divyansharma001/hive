import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import useGetPosts from "../../hooks/useGetPosts";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from 'react-hot-toast';
import { getRefresh } from "../../redux/postSlice";
import axios from 'axios';

function Post() {
  const { user } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [postsState, setPosts] = useState(posts || []);

  useGetPosts(user?.id);

  const handlePostLike = async (id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_POST_API_END_POINT}/like/${id}`, {
        id: user?.id,
      }, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(getRefresh());
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (posts) {
      setPosts(
        posts.map((post) => ({
          ...post,
          liked: post.likes.includes(user?.id),
          likes: Array.isArray(post.likes) ? post.likes : [],
        }))
      );
    }
  }, [posts, user?.id]);

  return (
    <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex flex-col p-4 mt-6">
      {postsState.length > 0 ? (
        postsState.map((post) => (
          <div className="flex mb-6" key={post.created_at}>
            <div className="p-4">
              <img
                src={
                  post.profile_picture ||
                  "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"
                }
                alt="Profile Picture"
                className="rounded-full h-10 w-10"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-white font-normal pt-4">{post.name}</h2>
                <p className="text-[#a7acaf] text-sm font-light">
                  @{post.username}
                </p>
              </div>
              <div className="text-white pt-3 text-xl">{post.description}</div>
              <div className="pt-3 text-[#7d8081] text-sm">
                {moment(post.created_at).format("MMMM Do YYYY, h:mm:ss a")}
              </div>
              <div className="pt-2 flex items-center">
                <button
                  onClick={() => handlePostLike(post.postid)}
                  className="focus:outline-none"
                >
                  {post.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </button>
                <span className="ml-2 text-white">{post.likes.length}</span>
                <button className="focus:outline-none ml-4">
                  <TbMessage2Plus className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Follow people to see what others have posted...</div>
      )}
    </div>
  );
}

export default Post;
