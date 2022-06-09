import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="overflow-hidden overflow-y-auto z-20 h-full bg-white scrolling-touch max-w-2xs lg:h-screen lg:block top:24 lg:top-12 lg:mr-0">
      <nav className="pt-16 px-1 pl-3 lg:pl-0 lg:pt-2 overflow-y-auto font-medium text-base lg:text-sm pb-10 lg:pb-20">
        <ul className="mb-0 list-unstyled">
          <li className="py-2 transition-colors duration-200 relative block">
            <Link className="px-4 py-2 hover:bg-gray-200" to="/">
              Dashboard
            </Link>
          </li>
          <li className="py-2 transition-colors duration-200 relative block">
            <Link className="px-4 py-2 hover:bg-gray-200" to="users">
              Utilisateurs
            </Link>
          </li>
          <li className="py-2 transition-colors duration-200 relative block">
            <Link className="px-4 py-2 hover:bg-gray-200" to="categories">
              Categories
            </Link>
          </li>
          <li className="py-2 transition-colors duration-200 relative block">
            <Link className="px-4 py-2 hover:bg-gray-200" to="items">
              Produits
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
