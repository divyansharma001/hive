import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {

  const fetchOtherUsers = async()=>{
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_USER_API_END_POINT}/profile/otheruser/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(getOtherUsers(res?.data?.otherUsers.rows));
      console.log('dispatched other users', res?.data?.otherUsers.rows);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchOtherUsers()
  
  }, []);
};

export default useGetOtherUsers;
