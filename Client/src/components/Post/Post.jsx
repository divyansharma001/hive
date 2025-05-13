// src/components/Post/Post.jsx
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { TbMessage2Plus } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import toast from "react-hot-toast";
import axios from "axios";
import { MdBookmarkBorder, MdBookmark, MdDeleteOutline, MdMoreHoriz } from "react-icons/md"; // Added MdMoreHoriz
import useGetPosts from "../../hooks/useGetPosts";
import { getRefresh } from "../../redux/postSlice";

function Post() {
  const { user } = useSelector((store) => store.user);
  const { posts, refresh } = useSelector((store) => store.post); // Ensure refresh is destructured if used as dependency
  const dispatch = useDispatch();
  const [postsState, setPostsState] = useState([]); // Renamed to avoid conflict

  useGetPosts(user?.id); // This hook likely depends on 'refresh' or 'user.id'

  useEffect(() => {
    if (posts) {
      setPostsState(
        posts.map((post) => ({
          ...post,
          liked: post.likes && Array.isArray(post.likes) ? post.likes.includes(user?.id) : false,
          bookmarked: user?.bookmarks?.some(
            (bookmark) => bookmark === post.postid || bookmark.id === post.postid
          ),
          likesCount: post.likes && Array.isArray(post.likes) ? post.likes.length : 0,
        }))
      );
    }
  }, [posts, user?.id, user?.bookmarks]);


  const handlePostLike = async (postId) => {
    // ... (existing logic, ensure postId is used)
    try {
      const res = await axios.put(`${import.meta.env.VITE_POST_API_END_POINT}/like/${postId}`, { id: user?.id }, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) { /* ... */ }
  };

  const handleBookmark = async (postId) => {
    // ... (existing logic, ensure postId is used)
     try {
      const res = await axios.put(`${import.meta.env.VITE_USER_API_END_POINT}/bookmark/${postId}`, { id: user?.id }, { withCredentials: true });
      toast.success(res.data.message);
      dispatch(getRefresh()); // Refresh posts to update bookmark state from backend if needed for user object
    } catch (error) { /* ... */ }
  };

  const handleDeletePost = async (postId) => {
    // ... (existing logic, ensure postId is used)
    try {
      const res = await axios.delete(`${import.meta.env.VITE_POST_API_END_POINT}/delete/${postId}`,{ data: { userId: user?.id }, withCredentials: true }); // Pass userId if backend needs it for auth
      toast.success(res.data.message);
      dispatch(getRefresh());
    } catch (error) { /* ... */ }
  };
  
  if (!postsState || postsState.length === 0) {
    return (
        <div className="w-full space-y-6 mt-6">
            {[1,2,3].map(i => ( // Post Skeleton
                <div className="bg-hive-dark-100 p-4 rounded-xl shadow-md animate-pulse" key={i}>
                    <div className="flex space-x-3">
                        <div className="bg-hive-gray-dark rounded-full h-11 w-11"></div>
                        <div className="flex-grow space-y-2">
                            <div className="bg-hive-gray-dark h-4 w-1/3 rounded"></div>
                            <div className="bg-hive-gray-dark h-3 w-1/4 rounded"></div>
                        </div>
                    </div>
                    <div className="bg-hive-gray-dark h-5 w-full mt-3 rounded"></div>
                    <div className="bg-hive-gray-dark h-5 w-3/4 mt-1 rounded"></div>
                    <div className="flex space-x-4 mt-4">
                        <div className="bg-hive-gray-dark h-6 w-10 rounded"></div>
                        <div className="bg-hive-gray-dark h-6 w-10 rounded"></div>
                        <div className="bg-hive-gray-dark h-6 w-10 rounded"></div>
                    </div>
                </div>
            ))}
             {posts === null && <div className="text-center py-10 text-hive-gray-light">Loading posts...</div>}
             {posts && posts.length === 0 && <div className="text-center py-10 text-hive-gray-light">No posts yet. Follow some people or create your first buzz!</div>}
        </div>
    )
  }

  return (
    <div className="w-full space-y-5 mt-6">
      {postsState.map((post) => (
        <div
          className="bg-hive-dark-100 p-4 rounded-xl shadow-md"
          key={post.postid || post.created_at}
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <img
                src={post.profile_picture || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
                alt="Profile Picture"
                className="rounded-full h-11 w-11 object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-white font-semibold text-sm sm:text-base">{post?.name}</h2>
                  <p className="text-hive-gray-light text-xs sm:text-sm">
                    @{post.username} ·{" "}
                    <span className="hover:underline cursor-pointer" title={moment(post.created_at).format("MMMM Do YYYY, h:mm:ss a")}>
                        {moment(post.created_at).fromNow()}
                    </span>
                  </p>
                </div>
                {/* More options dropdown (e.g., for delete, report) */}
                {user?.id === post?.user_id && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-xs text-hive-gray-light hover:bg-hive-dark-200 p-1">
                            <MdMoreHoriz size={20}/>
                        </label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-hive-dark-200 rounded-md w-36">
                            <li>
                            <button
                                onClick={() => handleDeletePost(post.postid)}
                                className="text-red-500 hover:bg-red-700 hover:text-white w-full text-left px-3 py-1.5 rounded text-sm flex items-center"
                            >
                                <MdDeleteOutline className="mr-2" size={18}/> Delete
                            </button>
                            </li>
                            {/* Add other options like 'Edit Post' if applicable */}
                        </ul>
                    </div>
                )}
              </div>
              <div className="text-gray-100 pt-2 text-sm sm:text-base my-1 whitespace-pre-wrap break-words">
                {post.description}
              </div>
              {/* Placeholder for Post Image/Video */}
              {/* {post.mediaUrl && <img src={post.mediaUrl} className="rounded-lg mt-2 border border-hive-gray-dark max-h-96 object-contain"/>} */}

              <div className="pt-2 flex items-center space-x-4 sm:space-x-6 text-hive-gray-light">
                <button
                  onClick={() => handlePostLike(post?.postid)}
                  className="flex items-center hover:text-red-500 focus:outline-none group transition-colors"
                  aria-label="Like post"
                >
                  {post.liked ? (
                    <FaHeart className="text-red-500" size={18} />
                  ) : (
                    <FaRegHeart className="group-hover:text-red-400" size={18}/>
                  )}
                  <span className={`ml-1.5 text-xs sm:text-sm ${post.liked ? 'text-red-500' : 'text-hive-gray-light'} group-hover:text-red-400`}>
                    {post.likesCount > 0 ? post.likesCount : ''}
                  </span>
                </button>
                
                <button className="flex items-center hover:text-hive-gold focus:outline-none group transition-colors" aria-label="Comment on post">
                  <TbMessage2Plus size={19} className="group-hover:text-blue-400" />
                  {/* <span className="ml-1.5 text-xs sm:text-sm">{post.commentsCount > 0 ? post.commentsCount : ''}</span> */}
                </button>

                <button
                  onClick={() => handleBookmark(post?.postid)}
                  className="flex items-center hover:text-hive-gold focus:outline-none group transition-colors"
                  aria-label="Bookmark post"
                >
                  {post.bookmarked ? (
                    <MdBookmark className="text-hive-gold" size={20} />
                  ) : (
                    <MdBookmarkBorder className="group-hover:text-yellow-400" size={20}/>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default Post;