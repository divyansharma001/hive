import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyProfile } from "../redux/userSlice";

const useGetProfile = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {

  const fetchMyProfile = async()=>{
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_END_POINT}/profile/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getMyProfile(res?.data?.userDetails));

    } catch (error) {
      console.error(error);
    }
  }
  
  fetchMyProfile()
  
  }, []);
};

export default useGetProfile;
