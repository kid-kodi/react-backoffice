import React from "react";
import HeaderLayout from "./HeaderLayout";
const PageLayout = ({ title, headerChildren, children }) => {
  return (
    <div className="mx-auto max-w-6xl px-4 h-screen">
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
export default PageLayout;
