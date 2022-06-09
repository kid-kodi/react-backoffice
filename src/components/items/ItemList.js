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
import { GET_CATEGORIES, GET_ITEMS } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import MyDialog from "../widgets/MyModal";
const headerChildren = (
  <div>
    <Link
      className="bg-green-600 text-white px-4 py-2 rounded text-2xl"
      to="edit"
    >
      Créer un article
    </Link>
  </div>
);

const ItemList = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [pager, setPager] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const httpRequest = FetchWrapper();

  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page && params.title && params.category) {
      loadPage();
    } else {
      setSearchParams({ page: 1, title: "all", category: "all" });
    }
  }, [searchParams]);

  const loadPage = async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page) {
      //get page of items from api
      const page = parseInt(params.page) || 1;
      if (page !== currentPage) {
        const response = await httpRequest.get(
          `${GET_ITEMS}list?page=${page}&title=${params.title}&category=${params.category}`
        );
        setPageOfItems(response.pageOfItems);
        setItems(response.pageOfItems);
        setFilteredItems(response.pageOfItems);
        setPager(response.pager);
      }
    }
  };

  const deleteItem = (id) => {
    setSelectedItems([]);
    let items = filteredItems.filter((item) => {
      if (item._id === id) {
        item.isChecked = true;
        return item;
      }
    });
    setSelectedItems([...items]);
    toggleModal();
  };

  const handleDelete = async () => {
    let checkedIDS = [];
    selectedItems.forEach((item) => {
      checkedIDS.push(item._id);
    });
    const response = await httpRequest.post(`${GET_ITEMS}delete`, checkedIDS);
    if (response) {
      toggleModal();
      loadPage();
    }
  };

  const getSelectedItems = () => {
    let items = filteredItems.filter((item) => {
      return item.isChecked;
    });
    setSelectedItems([...items]);
  };

  const handleAllChecked = (e) => {
    let items = filteredItems;
    items.forEach((item) => (item.isChecked = e.target.checked));
    setFilteredItems([...items]);
    getSelectedItems();
  };

  const handleCheckChieldElement = (event) => {
    let items = filteredItems;
    items.forEach((item) => {
      if (item._id === event.target.value)
        item.isChecked = event.target.checked;
    });
    setFilteredItems([...items]);
    getSelectedItems();
  };

  function handleSearch(event) {
    event.preventDefault();
    let formData = new FormData(event.currentTarget);
    let query = { page: 1, title: "all", category: "all" };
    let category = formData.get("category");
    let title = formData.get("title");
    if (title) {
      query.title = title;
    }
    if (category) {
      query.category = category;
    }
    setSearchParams(query);
  }

  return (
    <PageLayout title="Articles" headerChildren={headerChildren}>
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
              disabled={selectedItems.length === 0}
              onClick={() => toggleModal()}
              className="font-thin px-4 py-2 border border-gray-300 text-gray-900 rounded bg-gray-100 hover:bg-gray-200"
            >
              Supprimer
            </button>
          </div>

          <div className="relative mt-1">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-300 text-gray-900 rounded-lg p-2"
            >
              <input
                type="text"
                id="table-search"
                name="title"
                className="border-0 block w-80 pl-10"
                placeholder="Rechercher un article"
              />
              <select
                name="category"
                className="border border-gray-300 rounded-full"
              >
                <option value="">Toutes les catégories</option>
                {categories &&
                  categories.length > 0 &&
                  categories.map((category, index) => (
                    <option value={category.name} key={index}>
                      {category.name}
                    </option>
                  ))}
              </select>
              <button type="submit">
                <div className="flex items-center pl-3 pointer-events-none">
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                </div>
              </button>
            </form>
          </div>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-gray-500 bg-gray-50">
              <tr>
                <th className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredItems.length}
                      onChange={handleAllChecked}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Titre</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Categories</th>
                <th className="px-6 py-3">Publier ?</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={item._id}
                        checked={item.isChecked}
                        onClick={handleCheckChieldElement}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <img src={item.coverPicture} className="w-20 h-20" />
                  </td>
                  <td className="px-6 py-4">
                    <div>{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{item.description}</div>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">
                    {item.isVisible ? "Visible" : "Invisible"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-right flex items-center justify-end space-x-2">
                      <a href={`/items/edit/${item._id}`}>
                        <PencilIcon className="w-7 h-7 text-gray-500" />
                      </a>
                      <TrashIcon
                        className="cursor-pointer w-7 h-7 text-gray-500"
                        onClick={(e) => deleteItem(item._id)}
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
                to={{ search: `?page=1&title=all` }}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                  pager.currentPage === 1 ? "disabled" : ""
                }`}
              >
                Premier
              </Link>
              {pager.pages.map((page) => (
                <Link
                  key={page}
                  to={{ search: `?page=${page}&title=all` }}
                  className={`bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    pager.currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </Link>
              ))}
              <Link
                to={{ search: `?page=${pager.totalPages}&title=all` }}
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

export default ItemList;
