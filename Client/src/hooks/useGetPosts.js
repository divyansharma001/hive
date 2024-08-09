import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/postSlice";

const useGetPosts = (id) => {
  const dispatch = useDispatch();
  const {refresh} = useSelector(store=>store.post)
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_POST_API_END_POINT}/getAllPosts/${id}`,
          {
            withCredentials: true,
          }
        );
        dispatch(getAllPosts(res?.data?.posts));
        console.log(res?.data?.posts, "posts");
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyPosts();
  }, [refresh]);
};

export default useGetPosts;
