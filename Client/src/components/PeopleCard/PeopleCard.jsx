import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";
import PeopleCardSkeleton from "../Skeletons/PeopleCardSkeleton";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { setUser } from "../../redux/userSlice";

function PeopleCard() {
  const dispatch = useDispatch();
  const { user, otherUsers } = useSelector((store) => store.user);
  useGetOtherUsers(user?.id);

  const [followingStatus, setFollowingStatus] = useState({});

  useEffect(() => {
    if (user && otherUsers) {
      const status = {};
      otherUsers.forEach(otherUser => {
        status[otherUser.id] = user.following.includes(otherUser.id);
      });
      setFollowingStatus(status);
    }
  }, [user, otherUsers]);

  const toggleFollow = async (id) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/follow/${id}`,
        { id: user?.id },
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success(res.data.message);
      
      // Update local state
      setFollowingStatus(prev => ({...prev, [id]: !prev[id]}));
      
      // Update Redux store
      dispatch(setUser({
        ...user,
        following: followingStatus[id] 
          ? user.following.filter(userId => userId !== id)
          : [...user.following, id]
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
      <div className="card-body">
        <h2 className="font-semibold text-xl text-center">Who to follow</h2>

        {otherUsers ? (
          <div>
            {otherUsers?.map((detail, index) => (
              <div className="flex items-center py-2 space-x-4" key={index}>
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
      </div>
    </div>
  );
}

export default PeopleCard;
