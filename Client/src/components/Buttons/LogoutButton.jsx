import React from "react";

const LogoutButton = () => {
  const handleLogout = () => {
    dispatch(clearUser());
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
