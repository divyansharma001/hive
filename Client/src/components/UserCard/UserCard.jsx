import React, { useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from "../../hooks/useGetProfile";
import UserCardSkeleton from "../Skeletons/UserCardSkeleton";
import { getMyProfile } from "../../redux/userSlice";
import axios from "axios";

function UserCard() {
  const { user, profile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useGetProfile(user?.id);

  useEffect(() => {
    const fetchUpdatedProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_USER_API_END_POINT}/profile/${user?.id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(getMyProfile(res?.data?.userDetails));
      } catch (error) {
        console.error(error);
      }
    };

    // Set up an interval to fetch updated profile data
    const intervalId = setInterval(fetchUpdatedProfile, 5000); // Fetch every 5 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [user?.id, dispatch, user?.bookmarks?.length, user?.followers?.length, user?.following?.length]);

  return (
    <>
    {profile ? (
      <div className="card bg-hive-dark-200 shadow-lg text-gray-200 rounded-xl">
        <figure className="px-6 pt-6">
          <img
            src={user?.profile_picture || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
            alt="Profile Pic"
            className="rounded-full h-24 w-24 object-cover border-2 border-hive-gold"
          />
        </figure>
        <div className="card-body items-center text-center px-4 py-5">
          <h2 className="text-xl font-semibold text-white">{profile?.name}</h2>
          <p className="text-hive-gray-light text-sm pb-1">@{profile?.username}</p>
          {profile?.location && (
            <div className="inline-flex items-center text-hive-gray-light text-xs">
              <CiLocationOn className="mr-1" />
              {profile?.location}
            </div>
          )}
          <p className="text-hive-gray-light text-sm py-2 leading-snug">
            {profile?.bio || "Exploring the hive! 🐝"}
          </p>

          <div className="flex justify-around w-full mt-3 pt-3 border-t border-hive-gray-dark">
            <div className="text-center">
              <div className="text-white font-semibold">{profile?.bookmarks?.length || 0}</div>
              <div className="text-hive-gray-light text-xs">Bookmarks</div>
            </div>
            <div className="text-center">
              <div className="text-white font-semibold">{profile?.followers?.length || 0}</div>
              <div className="text-hive-gray-light text-xs">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-white font-semibold">{profile?.following?.length || 0}</div>
              <div className="text-hive-gray-light text-xs">Following</div>
            </div>
          </div>
        </div>
      </div>
    ) : (
     <UserCardSkeleton/>
    )}
  </>
  );
}

export default UserCard;
