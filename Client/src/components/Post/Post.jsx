import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { MdBookmarkBorder, MdBookmark, MdDeleteOutline } from "react-icons/md";
import useGetPosts from "../../hooks/useGetPosts";
import { getRefresh } from "../../redux/postSlice";

function Post() {
  const { user } = useSelector((store) => store.user);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();
  const [postsState, setPosts] = useState(posts || []);

  useGetPosts(user?.id);

  const handlePostLike = async (id) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_POST_API_END_POINT}/like/${id}`,
        { id: user?.id },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleBookmark = async (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.postid === id ? { ...post, bookmarked: !post.bookmarked } : post
      )
    );

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_USER_API_END_POINT}/bookmark/${id}`,
        { id: user?.id },
        { withCredentials: true }
      );

      toast.success(res.data.message);
    } catch (error) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postid === id ? { ...post, bookmarked: !post.bookmarked } : post
        )
      );

      console.error("Error bookmarking post:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_POST_API_END_POINT}/delete/${id}`,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error(error.response?.data?.message || "An error occurred");
      dispatch(getRefresh());
    }
  };

  useEffect(() => {
    if (posts) {
      setPosts(
        posts.map((post) => ({
          ...post,
          liked: post.likes.includes(user?.id),
          bookmarked: user?.bookmarks?.some(
            (bookmark) =>
              bookmark === post.postid || bookmark.id === post.postid
          ),
          likes: Array.isArray(post.likes) ? post.likes : [],
        }))
      );
    }
  }, [posts, user?.id, user?.bookmarks]);

  useEffect(() => { 
    console.log("User:", user);
    console.log("Posts:", posts);
  }, [user, posts]);

  useEffect(() => {
    if (user?.following) {
      dispatch(getRefresh());
    }
  }, [user?.following, dispatch]);

  return (
    <div className="bg-[rgb(15,16,18)] w-11/12 rounded-xl flex flex-col p-4 mt-6">
      {postsState?.length > 0 ? (
        postsState.map((post, index) => (
          <div
            className={`flex mb-6 p-4 rounded-lg ${
              index % 2 === 0 ? "bg-[rgb(23,23,24)]" : "bg-[rgb(23,23,24)]"
            }`}
            key={post.created_at}
          >
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
                <h2 className="text-white font-normal pt-4">{post?.name}</h2>
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
                  onClick={() => handlePostLike(post?.postid)}
                  className="focus:outline-none"
                >
                  {post.likes.includes(user?.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </button>
                <span className="ml-2 text-white">{post.likes?.length}</span>
                <button className="focus:outline-none ml-4">
                  <TbMessage2Plus className="text-white" />
                </button>

                <button
                  onClick={() => handleBookmark(post?.postid)}
                  className="focus:outline-none ml-4"
                >
                  {post.bookmarked ? (
                    <MdBookmark className="text-[#FFDB00]" />
                  ) : (
                    <MdBookmarkBorder className="text-white" />
                  )}
                </button>

                {user?.id === post?.user_id && (
                  <button
                    onClick={() => handleDeletePost(post.postid)}
                    className="focus:outline-none ml-4"
                  >
                    <MdDeleteOutline className="text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      )}
    </div>
  );
}

export default Post;
