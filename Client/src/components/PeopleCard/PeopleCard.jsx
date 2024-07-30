import React from "react";
import { useSelector } from "react-redux";
import useGetOtherUsers from "../../hooks/useGetOtherUsers";

function PeopleCard() {
  const { user, otherUsers } = useSelector((store) => store.user);
  useGetOtherUsers(user?.id);


  return (
    <div className="card bg-[rgb(15,16,18)] w-80 shadow-xl ml-12 text-white">
      <div className="card-body">
        <h2 className="font-semibold text-xl text-center">Who to follow</h2>

        {otherUsers?.map((detail, index) => (
          <div
            className="flex items-center py-2 space-x-4"
            key={index}
          >
            <img
              src={detail?.profilePic || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
              alt="Profile"
              className="w-14 h-14 rounded-full"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold truncate">{detail?.name}</div>
              <div className="text-[#a7acaf] text-sm truncate">@{detail?.username}</div>
            </div>
            <button className="btn btn-outline text-[#FFDB00] w-24 h-8 flex-shrink-0">
              FOLLOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PeopleCard;
