import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AppLayout = () => {
  return (
    <div className="w-full h-full">
      <div className="sticky top-0 z-40 flex flex-none w-full py-3 mx-auto bg-white border-b border-gray-200">
        <Header />
      </div>
      <div className="px-4 mx-auto w-full max-w-8xl">
        <div className="lg:flex">
          <div className="hidden fixed inset-0 z-20 flex-none w-72 h-full lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-48 lg:block">
            <Sidebar />
          </div>
          <div className="flex-auto w-full min-w-0 lg:static lg:max-h-full lg:overflow-visible">
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
