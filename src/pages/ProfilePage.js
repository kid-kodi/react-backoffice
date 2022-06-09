import React from "react";
import {
  CameraIcon,
  UserCircleIcon,
  UserAddIcon,
  LockOpenIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="mx-auto max-w-6xl py-4 h-screen">
      <div className="flex">
        <div className="px-4 bg-slate-100 rounded-[50px]">
          <div className="my-10 w-[300px] text-center">
            <div className="relative w-[150px] mb-8 mx-auto">
              <img
                className="h-[150px] w-[150px] rounded-full"
                src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                alt=""
              />
              <Link
                to="avatar"
                className="p-2 cursor-pointer absolute bottom-0 right-0 bg-gray-400 rounded-full hover:opacity-50"
              >
                <CameraIcon className="w-5 h-5 text-white" />
              </Link>
            </div>
            <a href="#" className="w-full">
              Kojstantin
            </a>
          </div>
          <nav className="flex flex-col py-4">
            {/* <Link
              className="flex items-center space-x-2 hover:bg-slate-300 rounded-[50px]"
              to=""
            >
              <UserCircleIcon className="w-10 h-10 p-2  b-gray-200 rounded-full" />
              <span className="">Mon compte utilisateur</span>
            </Link> */}
            <Link
              className="flex items-center space-x-2 hover:bg-slate-300 rounded-[50px]"
              to="edit"
            >
              <UserAddIcon className="w-10 h-10 p-2  b-gray-200 rounded-full" />
              <span>Modifier mon compte</span>
            </Link>
            <Link
              className="flex items-center space-x-2 hover:bg-slate-300 rounded-[50px]"
              to="changepassword"
            >
              <LockOpenIcon className="w-10 h-10 p-2  b-gray-200 rounded-full" />

              <span>Changer de mot de passe</span>
            </Link>
            <Link
              className="flex items-center space-x-2 hover:bg-slate-300 rounded-[50px]"
              to=""
            >
              <LogoutIcon className="w-10 h-10 p-2  b-gray-200 rounded-full" />
              <span>Déconnexion</span>
            </Link>
          </nav>
        </div>
        <div className="w-full ml-24">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
