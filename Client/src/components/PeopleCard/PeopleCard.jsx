import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import PeopleCardSkeleton from "../Skeletons/PeopleCardSkeleton";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { setUser, clearUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

function PeopleCard() {
  const dispatch = useDispatch();
  const { user, otherUsers } = useSelector((store) => store.user);
  useGetOtherUsers(user?.id);
  const navigate = useNavigate()

  const [followingStatus, setFollowingStatus] = useState({});

  useEffect(() => {
    if (user && otherUsers) {
      const status = {};
      otherUsers.forEach(otherUser => {
        status[otherUser.id] = user.following.includes(+otherUser.id);
      });
      setFollowingStatus(status);
    }
  }, [user, otherUsers]);

  const toggleFollow = async (id) => {
    try {
      setFollowingStatus(prev => ({...prev, [id]: !prev[id]}));

      const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/follow/${id}`,
        { id: user?.id },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success(res.data.message);
      
      // Update Redux store
      dispatch(setUser({
        ...user,
        following: followingStatus[id] 
          ? user.following.filter(userId => userId !== +id)
          : [...user.following, +id]
      }));
    } catch (error) {
      // Revert the local state change if the API call fails
      setFollowingStatus(prev => ({...prev, [id]: !prev[id]}));
      toast.error(error.response?.data?.message || "An error occurred");
      console.error("Error toggling follow:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/logout`, 
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(clearUser());
      navigate('/')
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
      <div className="card-body">
        <h2 className="font-semibold text-xl text-center">Who to follow</h2>

        {otherUsers ? (
          <div>
            {otherUsers.map((detail) => (
              <div className="flex items-center py-2 space-x-4" key={detail.id}>
                <img
                  src={
                    detail?.profilePic ||
                    "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"
                  }
                  alt="Profile"
                  className="w-14 h-14 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{detail?.name}</div>
                  <div className="text-[#a7acaf] text-sm truncate">
                    @{detail?.username}
                  </div>
                </div>
                <button 
                  onClick={() => toggleFollow(detail?.id)} 
                  className={`btn btn-outline w-24 h-8 flex-shrink-0 ${
                    followingStatus[detail?.id] ? 'text-red-500' : 'text-[#FFDB00]'
                  }`}
                >
                  {followingStatus[detail?.id] ? 'UNFOLLOW' : 'FOLLOW'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <PeopleCardSkeleton />
        )}
        
        {user && (
          <button 
            onClick={handleLogout}
            className="btn btn-outline btn-error mt-4 w-full"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default PeopleCard;