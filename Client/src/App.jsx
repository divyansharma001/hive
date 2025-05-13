import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { useDispatch } from 'react-redux'; // Import useDispatch
import axios from 'axios'; // Import axios
import { setUser, clearUser } from './redux/userSlice'; // Import your actions

function App() {
  const dispatch = useDispatch();
  const [loadingAuthState, setLoadingAuthState] = useState(true); // To show a loader

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // The cookie should be sent automatically due to withCredentials
        const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/me`, {
          withCredentials: true,
        });

        if (res.data.success && res.data.user) {
          dispatch(setUser(res.data.user)); // Populate Redux store
        } else {
          // If not successful or no user data, ensure user is cleared
          dispatch(clearUser());
        }
      } catch (error) {
        // If error (e.g., 401 Unauthorized), it means user is not logged in or token expired
        console.warn('Not authenticated or error fetching auth status:', error.response?.data?.message || error.message);
        dispatch(clearUser());
      } finally {
        setLoadingAuthState(false); // Stop loading
      }
    };

    checkAuthStatus();
  }, [dispatch]); // Dependency array includes dispatch

  // Optionally, show a loading indicator while checking auth
  if (loadingAuthState) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-black text-[#FFDB00]">
        <span className="loading loading-ring loading-lg"></span>
        <p className="mt-4">Loading Hive...</p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col bg-[#000000] text-[#FFDB00]">
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
          }}
        />
        <Navbar />
        {/* Make sure the main content area can grow */}
        <main className="flex-grow container mx-auto px-4 py-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;