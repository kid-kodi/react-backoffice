import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import {
  PencilIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { GET_USERS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import MyDialog from "../../components/widgets/MyModal";
const headerChildren = (
  <div>
    <Link
      className="bg-green-600 text-white px-4 py-2 rounded text-2xl"
      to="edit"
    >
      Créer un utilisateur
    </Link>
  </div>
);

const UserList = () => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [pager, setPager] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const httpRequest = FetchWrapper();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page) {
      loadPage();
    } else {
      setSearchParams({ page: 1 });
    }
  }, [searchParams]);

  const loadPage = async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page) {
      //get page of items from api
      const page = parseInt(params.page) || 1;
      if (page !== currentPage) {
        const response = await httpRequest.get(`${GET_USERS}list?page=${page}`);
        setPageOfItems(response.pageOfItems);
        setUsers(response.pageOfItems);
        setFilteredUsers(response.pageOfItems);
        setPager(response.pager);
      }
    }
  };

  const FilterByName = (name) => {
    const filtered = users.filter((user) =>
      user.firstName.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredUsers(filtered);
  };

  const deleteUser = (id) => {
    setSelectedUsers([]);
    let users = filteredUsers.filter((user) => {
      if (user._id === id) {
        user.isChecked = true;
        return user;
      }
    });
    setSelectedUsers([...users]);
    toggleModal();
  };

  const handleDelete = async () => {
    let checkedIDS = [];
    selectedUsers.forEach((user) => {
      checkedIDS.push(user._id);
    });
    const response = await httpRequest.post(`${GET_USERS}delete`, checkedIDS);
    if (response) {
      toggleModal();
      loadPage();
    }
  };

  const getSelectedUsers = () => {
    let users = filteredUsers.filter((user) => {
      return user.isChecked;
    });
    setSelectedUsers([...users]);
  };

  const handleAllChecked = (e) => {
    let users = filteredUsers;
    users.forEach((user) => (user.isChecked = e.target.checked));
    setFilteredUsers([...users]);
    getSelectedUsers();
  };

  const handleCheckChieldElement = (event) => {
    let users = filteredUsers;
    users.forEach((user) => {
      if (user._id === event.target.value)
        user.isChecked = event.target.checked;
    });
    setFilteredUsers([...users]);
    getSelectedUsers();
  };

  return (
    <PageLayout title="Utilisateur" headerChildren={headerChildren}>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => loadPage()}
              className="font-thin px-4 py-2 border border-gray-300 text-gray-900 rounded bg-gray-100 hover:bg-gray-200"
            >
              Actualiser
            </button>
            <button
              disabled={selectedUsers.length === 0}
              onClick={() => toggleModal()}
              className="font-thin px-4 py-2 border border-gray-300 text-gray-900 rounded bg-gray-100 hover:bg-gray-200"
            >
              Supprimer
            </button>
          </div>

          <div className="p-4">
            <label className="sr-only">Search</label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-gray-500" />
              </div>
              <input
                type="text"
                id="table-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5"
                placeholder="Rechercher un utilisateur"
                onChange={(e) => FilterByName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-gray-500 bg-gray-50">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUsers.length === filteredUsers.length}
                      onChange={handleAllChecked}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="px-6 py-3">Name/Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={user._id}
                        checked={user.isChecked}
                        onClick={handleCheckChieldElement}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{user.firstName + " " + user.lastName}</div>
                  </td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? "Admin" : "Utilisateur"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-right flex items-center justify-end space-x-2">
                      <a href={`/users/edit/${user._id}`}>
                        <PencilIcon className="w-7 h-7 text-gray-500" />
                      </a>
                      <TrashIcon
                        className="cursor-pointer w-7 h-7 text-gray-500"
                        onClick={(e) => deleteUser(user._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center my-5">
          {pager && pager.pages && pager.pages.length && (
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <Link
                to={{ search: `?page=1` }}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                Premier
              </Link>
              {pager.pages.map((page) => (
                <Link
                  key={page}
                  to={{ search: `?page=${page}` }}
                  className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    pager.currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </Link>
              ))}
              <Link
                to={{ search: `?page=${pager.totalPages}` }}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                  pager.currentPage === pager.totalPages ? "disabled" : ""
                }`}
              >
                Dernier
              </Link>
            </nav>
          )}
          {/*  */}
        </div>
      </div>
      <MyDialog
        isOpen={isModalOpen}
        toggle={toggleModal}
        submit={handleDelete}
      />
    </PageLayout>
  );
};

export default UserList;
