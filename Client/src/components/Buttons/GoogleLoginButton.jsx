import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser, setUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/google-login`,
        { credential: credentialResponse.credential },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(getUser(response?.data?.user));
        dispatch(setUser(response?.data?.user));
        navigate('/');
      }
    } catch (error) {
      console.error('Google login error:', error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => {
        console.log("Login Failed");
      }}
    />
  );
};

export default GoogleLoginButton;