import axios from "axios";
import { useEffect } from "react";


const useGetProfile = async (id) => {
    useEffect(()=>{
        try {
            const res = axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/profile/${id}`,{
                withCredentials: true,
            })
        } catch (error) {
            console.error(error);
        }
    }, [])
    
};

export default useGetProfile;