import React from "react";
import HeaderLayout from "./HeaderLayout";
const ProfileLayout = ({ title, headerChildren, children }) => {
  return (
    <div className="w-full px-4 h-screen">
      <HeaderLayout
        title={title}
        headerChildren={headerChildren}
      ></HeaderLayout>
      <div className="">
        <main>{children}</main>
      </div>
    </div>
  );
};
export default ProfileLayout;
