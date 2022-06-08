import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { LogoutIcon } from "@heroicons/react/outline";

const Navigation = () => {
  const { user, dispatch } = useContext(AuthContext);
  let history = useHistory();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  return (
    <>
      {user && (
        <nav className="flex flex-col absolute top-0 bottom-0 left-0 right-0 p-4">
          <Link to="/">
            <h1 className="text-2xl text-green-600 font-bold mb-3">
              Solisalim.com
            </h1>
          </Link>
          <NavLink
            to="/categories"
            className={(isActive) =>
              isActive ? "bg-green-500 text-white p-2 my-2 rounded" : "p-2 my-2"
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/posts"
            className={(isActive) =>
              isActive ? "bg-green-500 text-white p-2 my-2 rounded" : "p-2 my-2"
            }
          >
            Articles
          </NavLink>
          <NavLink
            to="/users"
            className={(isActive) =>
              isActive ? "bg-green-500 text-white p-2 my-2 rounded" : "p-2 my-2"
            }
          >
            Utilisateurs
          </NavLink>
          <footer className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center p-2 space-x-2 cursor-pointer rounded-md hover:bg-green-200">
              <span>{user.profile.email}</span>
              <button onClick={handleLogout}>
                <LogoutIcon className="w-6 h-6" />
              </button>
            </div>
          </footer>
        </nav>
      )}
    </>
  );
};

export default Navigation;
