import React from "react";
import logo from "../images/logo.png";

const Header = () => {
  return (
    <div className="flex items-center justify-between w-full px-3 mx-auto max-w-8xl lg:px-4">
      <div className="w-[100px] h-[50px]">
        <img src={logo} />
      </div>
    </div>
  );
};

export default Header;
