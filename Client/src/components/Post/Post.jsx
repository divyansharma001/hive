import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import useGetPosts from "../../hooks/useGetPosts";
import { useSelector } from "react-redux";
import moment from "moment"; // Assuming moment.js is installed

function Post() {
  const { user } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);

  useGetPosts(user?.id);

  const handlePostLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  useEffect(() => {
    if (posts) {
      setPosts(
        posts.map((post) => ({
          ...post,
          liked: false,
          likes: post.likes || 0,
        }))
      );
    }
  }, [posts]);

  const [postsState, setPosts] = useState(posts || []);

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
                  onClick={() => handlePostLike(post.id)}
                  className="focus:outline-none"
                >
                  {post.liked ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </button>
                <span className="ml-2 text-white">{post.likes}</span>
                <button className="focus:outline-none ml-4">
                  <TbMessage2Plus className="text-white" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
         Follow people to see what others have posted...
        </div>
      )}
    </div>
  );
}

export default Post;
