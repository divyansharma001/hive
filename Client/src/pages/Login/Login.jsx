import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUser, setUser } from "../../redux/userSlice";
import GoogleLoginButton from "../../components/Buttons/GoogleLoginButton";
import { GiTreeBeehive } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    debounceUpdateFromData(name, value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const debounceUpdateFromData = _.debounce((name, value) => {
    setFormdata((prevFormdata) => {
      return {
        ...prevFormdata,
        [name]: value,
      };
    });
  }, 500);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_USER_API_END_POINT}/login`,
        formdata,
        {
          headers: {
            "Content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch(getUser(res?.data?.user));
      dispatch(setUser(res?.data?.user));
      if (res.data.success) {
        toast.success(res.data.message);
      }
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-hive-black to-hive-dark-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20 hidden lg:block">
          <div className="w-20 h-20 rounded-full bg-hive-gold blur-xl"></div>
        </div>
        <div className="absolute bottom-10 right-10 opacity-20 hidden lg:block">
          <div className="w-32 h-32 rounded-full bg-hive-gold blur-xl"></div>
        </div>

        {/* Card container */}
        <div className="bg-hive-dark-200 rounded-2xl shadow-2xl border border-opacity-20 border-hive-gold overflow-hidden backdrop-blur-sm">
          {/* Header with decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-hive-gold via-yellow-500 to-hive-gold"></div>
          
          <div className="p-8 sm:p-10">
            {/* Logo and heading */}
            <div className="flex flex-col items-center space-y-3 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-hive-gold opacity-20 blur-md rounded-full"></div>
                <GiTreeBeehive className="text-hive-gold size-16 relative z-10" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Welcome to <span className="text-hive-gold">Hive</span>
              </h2>
              <p className="text-sm text-hive-gray-light">Keep the buzz going!</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
              <div className="space-y-4">
                {/* Email field */}
                <div className="relative group">
                  <label htmlFor="email" className="text-xs font-medium text-hive-gray-light mb-1 block">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiOutlineMail className="text-hive-gray-light group-focus-within:text-hive-gold transition-colors" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formdata.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-hive-dark-100 border border-hive-gray-dark text-white rounded-lg focus:ring-2 focus:ring-hive-gold focus:border-transparent transition-all outline-none placeholder-hive-gray-light"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="relative group">
                  <label htmlFor="password" className="text-xs font-medium text-hive-gray-light mb-1 block">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordLine className="text-hive-gray-light group-focus-within:text-hive-gold transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={formdata.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-10 py-3 bg-hive-dark-100 border border-hive-gray-dark text-white rounded-lg focus:ring-2 focus:ring-hive-gold focus:border-transparent transition-all outline-none placeholder-hive-gray-light"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-hive-gray-light hover:text-hive-gold"
                    >
                      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

            

              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-black font-medium bg-hive-gold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-hive-dark-200 focus:ring-hive-gold transition-all duration-200 disabled:opacity-70"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-hive-gray-dark"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-hive-dark-200 text-hive-gray-light">Or continue with</span>
                </div>
              </div>

              {/* Google login */}
              <div>
              <GoogleLoginButton className="w-full py-2.5 rounded-lg flex justify-center items-center bg-hive-dark-100 border border-hive-gray-dark hover:bg-hive-dark-200 transition-colors mx-auto" />
              </div>
            </form>

            {/* Sign up link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-hive-gray-light">
                First time on Hive?{" "}
                <Link to="/signup" className="font-medium text-hive-gold hover:text-yellow-400 transition-colors">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
