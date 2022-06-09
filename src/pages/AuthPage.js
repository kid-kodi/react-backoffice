import React from "react";
import { Outlet } from "react-router-dom";

const AuthPage = () => {
  return (
    <div className="w-full px-4 h-screen">
      <Outlet />
    </div>
  );
};

export default AuthPage;
