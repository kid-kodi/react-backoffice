import React, { useEffect, useState } from "react";
import List from "../../components/Post/List";
import { GET_USERS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";

import { SearchIcon, PlusSmIcon } from "@heroicons/react/outline";

const UserListPage = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(GET_USERS);
    setUsers(response);
    setFilteredUsers(response);
  }, []);

  const FilterByName = (name) => {
    const filtered = users.filter((user) =>
      user.name.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredUsers(filtered);
  };

  return (
    <main className="max-w-7xl mx-auto sm:px-16">
      <section>
        <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-slate-900">
              Utilisateurs
            </h2>
            <a
              href="/users/add"
              className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <PlusSmIcon className="w-6 h-6" />
              Nouveau utilisateur
            </a>
          </div>
          <form className="group flex items-center relative">
            <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" />
            <input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
              type="text"
              aria-label="Filtrer les articles"
              placeholder="Filtrer les utilisateurs..."
              onChange={(e) => FilterByName(e.target.value)}
            />
          </form>
        </header>
        <List>
          {filteredUsers.map((user) => (
            <div className="flex items-center justify-between">
              <span>{user.firstName + " " + user.lastName}</span>
              <div className="flex items-center space-x-2">
                <a
                  className="rounded-full border-2 border-blue-40 bg-blue-400 text-white px-4 p-2"
                  href={`/users/edit/${user._id}`}
                >
                  Modifier
                </a>
                <a
                  className="rounded-full border-2 border-blue-40 bg-blue-400 text-white px-4 p-2"
                  href={`/users/delete/${user._id}`}
                >
                  Supprimer
                </a>
                {/* <button
                  className="rounded-full border-2 border-blue-400 text-blue-400 px-4 p-2"
                  onClick={(e) => deleteUser(user._id)}
                >
                  Supprimer
                </button> */}
              </div>
            </div>
          ))}
        </List>
      </section>
    </main>
  );
};

export default UserListPage;
