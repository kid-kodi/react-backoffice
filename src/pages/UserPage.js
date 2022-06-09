import React from "react";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="w-full px-4 h-screen">
      <Outlet />
    </div>
  );
};

export default UserPage;
