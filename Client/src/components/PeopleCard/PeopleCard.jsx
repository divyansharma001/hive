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
    <div className="card bg-hive-dark-200 w-full shadow-lg text-gray-200 rounded-xl mt-6"> {/* Added mt-6 */}
    <div className="card-body p-4">
      <h2 className="font-semibold text-lg text-white mb-3 px-2">Who to follow</h2>
      {otherUsers && otherUsers.length > 0 ? (
        <div className="space-y-3 max-h-[400px] overflow-y-auto no-scrollbar pr-1"> {/* Scrollable list */}
          {otherUsers.map((detail) => (
            <div className="flex items-center py-2 px-2 space-x-3 hover:bg-hive-dark-100 rounded-lg transition-colors duration-150" key={detail.id}>
              <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                      <img
                      src={detail?.profilePic || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
                      alt="Profile"
                      />
                  </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-white truncate text-sm">{detail?.name}</div>
                <div className="text-hive-gray-light text-xs truncate">@{detail?.username}</div>
              </div>
              <button
                onClick={() => toggleFollow(detail?.id)}
                className={`btn btn-xs sm:btn-sm rounded-full normal-case font-semibold ${
                  followingStatus[detail?.id]
                    ? 'btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500'
                    : 'btn-outline border-hive-gold text-hive-gold hover:bg-hive-gold hover:text-black hover:border-hive-gold'
                }`}
              >
                {followingStatus[detail?.id] ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        !otherUsers ? <PeopleCardSkeleton /> : <p className="text-sm text-hive-gray-light px-2">No new suggestions right now.</p>
      )}
      {/* Optional: "Show More" button if list is paginated */}
    </div>
  </div>
  );
}

export default PeopleCard;