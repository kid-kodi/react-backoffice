import React from "react";
import { Outlet } from "react-router";
import Header from "../Header";

const AdminLayout = () => {
  return (
    <div>
      <Header />
      <hr />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
