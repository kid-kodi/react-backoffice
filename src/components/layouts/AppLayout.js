import React from "react";
import { Outlet } from "react-router";
import Footer from "../Footer";
import Header from "../Header";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <hr />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
