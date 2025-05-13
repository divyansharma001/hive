import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser, clearUser } from './redux/userSlice';

function App() {
  const dispatch = useDispatch();
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_USER_API_END_POINT}/me`, {
          withCredentials: true,
        });

        if (res.data.success && res.data.user) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch (error) {
        console.warn('Not authenticated or error fetching auth status:', error.response?.data?.message || error.message);
        dispatch(clearUser());
      } finally {
        setLoadingAuthState(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]);

  if (loadingAuthState) {
    return (
     <div className="w-full min-h-screen flex flex-col bg-hive-black text-hive-gold">
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

          style: {
            background: "#2D2D2D",
            color: "#E0E0E0",
            borderRadius: '8px',
          },
          success: {
            iconTheme: {
              primary: '#FFDB00',
              secondary: 'black',
            },
          },
          error: {
             iconTheme: {
              primary: '#EF4444',
              secondary: 'white',
            },
          }
        }}
      />
        <Navbar />
       
           <main className="flex-grow container mx-auto px-2 sm:px-4 py-4 w-full">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;