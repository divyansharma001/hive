// src/components/Create/CreatePost.jsx
import React, { useState, useRef } from "react";
import { TbPhotoSquareRounded } from "react-icons/tb";
import { MdOutlineLocationOn } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from "../../redux/postSlice";

function CreatePost() {
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef(null);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const expandTextarea = () => {
    setIsExpanded(true);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }, 10);
  };

  const submitHandler = async () => {
    if (!description.trim()) {
      toast.error("Post content cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      // ... (rest of submitHandler)
      const res = await axios.post(/* ... */);
      dispatch(getRefresh());
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && description.trim()) {
      submitHandler();
    }
  };

  return (
    <div className="bg-hive-dark-200 w-full rounded-2xl flex flex-col p-5 shadow-lg transition-all duration-300">
      <div className="flex space-x-4">
        <div className="flex-shrink-0">
          <img
            src={user?.profile_picture || "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.webp"}
            alt="Profile"
            className="rounded-full h-12 w-12 object-cover border-2 border-hive-gold shadow-md"
          />
        </div>
        <div className="flex-grow relative">
          <textarea
            ref={textareaRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            onClick={expandTextarea}
            className={`w-full bg-hive-dark-100 text-gray-100 placeholder-hive-gray-light focus:border-hive-gold focus:ring-1 focus:ring-hive-gold resize-none p-4 rounded-xl transition-all duration-300 outline-none ${
              isExpanded ? 'h-32' : 'h-12'
            }`}
            placeholder={isExpanded ? "What's buzzing in your mind?" : "Share your thoughts with the hive..."}
            style={{ 
              lineHeight: '1.5',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          ></textarea>
          
          {description.length > 0 && (
            <div className="absolute bottom-2 right-3 text-xs text-hive-gray-light">
              {description.length}/280
            </div>
          )}
        </div>
      </div>

      {(isExpanded || description.length > 0) && (
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-hive-gray-dark">
          <div className="flex space-x-1 sm:space-x-3 text-hive-gray-light">
            <button 
              title="Add Photo" 
              className="p-2 hover:bg-hive-dark-100 rounded-full hover:text-hive-gold transition-colors duration-200 flex items-center justify-center"
              onClick={() => toast.info('Feature coming soon!')}
            >
              <TbPhotoSquareRounded size={22} />
            </button>
            <button 
              title="Add Location" 
              className="p-2 hover:bg-hive-dark-100 rounded-full hover:text-hive-gold transition-colors duration-200 flex items-center justify-center"
              onClick={() => toast.info('Feature coming soon!')}
            >
              <MdOutlineLocationOn size={22} />
            </button>
            <button 
              title="Schedule Post" 
              className="p-2 hover:bg-hive-dark-100 rounded-full hover:text-hive-gold transition-colors duration-200 flex items-center justify-center"
              onClick={() => toast.info('Feature coming soon!')}
            >
              <LuCalendarDays size={22} />
            </button>
          </div>
          <div>
            <button
              onClick={submitHandler}
              disabled={!description.trim() || isLoading}
              className="btn px-6 bg-hive-gold hover:bg-yellow-400 text-black font-semibold rounded-full normal-case disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  Buzz <img src="/buzz.png" alt="" className="h-5 w-5 inline" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreatePost;