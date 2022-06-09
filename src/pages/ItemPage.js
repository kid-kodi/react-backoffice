import React from "react";
import { Outlet } from "react-router-dom";

const ItemPage = () => {
  return (
    <div className="w-full px-4 h-screen">
      <Outlet />
    </div>
  );
};

export default ItemPage;
