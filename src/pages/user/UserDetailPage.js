import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { GET_USERS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";

const UserDetailPage = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();
  const history = useHistory();
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(`${GET_USERS}${id}`);
    setUser(response);
  }, []);

  const deleteUser = async () => {
    const response = await httpRequest.remove(`${GET_USERS}${id}`);
    if (response) {
      history.push("/");
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-8 sm:px-16">
      <header>
        <nav className="py-4 flex items-center justify-between space-x-2 sticky top-0 bg-white">
          <a
            className="border-2 border-green-700 mb-5 inline-flex rounded-full p-2 text-green-700 hover:text-green-500 hover:border-green-500"
            href="/"
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <span className="">Retour</span>
          </a>
          <div className="flex items-center space-x-2">
            <a
              className="border-2 border-green-700 mb-5 inline-flex rounded-full p-2 bg-green-700 text-white hover:bg-green-500 hover:border-green-500"
              href={`/users/edit/${id}`}
            >
              Modifier
            </a>
            <button
              className="border-2 border-green-700 mb-5 inline-flex rounded-full p-2 bg-green-700 text-white hover:bg-green-500 hover:border-green-500"
              onClick={deleteUser}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </nav>
        <h1 className="text-3xl text-gray-700 font-bold">{user.title}</h1>
        <p className="text-xs text-gray-400 font-semibold">{user.createdAt}</p>
      </header>
      <div className="w-full">
        <img
          className="w-full h-[400px] border-2 rounded-md object-cover"
          src={user.coverPicture}
        />
      </div>
      <article className="py-5">
        <div dangerouslySetInnerHTML={{ __html: user.description }} />
      </article>
    </main>
  );
};

export default UserDetailPage;
