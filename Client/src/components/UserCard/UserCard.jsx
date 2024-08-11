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
  }, [user?.id, dispatch, user?.bookmarks.length, user?.followers.length, user?.following.length]);

  return (
    <>
      {profile ? (
        <div>
          <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white " >
            <figure className="px-10 pt-10">
              <img
               src={profile?.profile_picture ? profile?.profile_picture : "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
                alt="Profile Pic"
                className="rounded-full h-24 w-24"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="text-xl font-medium -mt-6">{profile?.name}</h2>
              <p className="text-[#a7acaf] text-sm pb-1">
                @{profile?.username}
              </p>
              <div className=" inline-flex">
                <div className="text-[#a7acaf] pt-1">
                  {" "}
                  <CiLocationOn />
                </div>
                <div className="text-[#a7acaf] px-1">{profile?.location ? profile?.location : "Milkyway"}</div>
              </div>
              <p className="text-[#a7acaf] pb-3">
                {profile?.bio ? profile?.bio : "Hey let's connect 👀!!" }
              </p>

              <div className="flex">
                <div className="text-[#a7acaf] px-3 pt-2">
                  Bookmarks
                  <div className="text-white">{profile?.bookmarks.length}</div>
                </div>
                <div className="text-[#a7acaf] px-3 pt-2">
                  Followers
                  <div className="text-white">{profile?.followers.length}</div>
                </div>
                <div className="text-[#a7acaf] px-3 pt-2">
                  Following
                  <div className="text-white">{profile?.following.length}</div>
                </div>
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
