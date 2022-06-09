import React from "react";

const HeaderLayout = ({ title, headerChildren }) => {
  return (
    <div className="bg-white shadow-sm sticky top-0 flex items-center justify-between h-[100px] border-b border-b-gray-200 my-4 font-thin">
      <h1 className="text-5xl">{title}</h1>
      <div className="flex items-center space-x-4">{headerChildren}</div>
    </div>
  );
};

export default HeaderLayout;
