import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";
import { PencilIcon, TrashIcon, SearchIcon } from "@heroicons/react/outline";
import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";
import MyDialog from "../../components/widgets/MyModal";
const headerChildren = (
  <div>
    <Link
      className="bg-green-600 text-white px-4 py-2 rounded text-2xl"
      to="edit"
    >
      Créer une catégorie
    </Link>
  </div>
);

const CategoryList = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categories, setCategories] = useState([]);
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
        const response = await httpRequest.get(
          `${GET_CATEGORIES}list?page=${page}`
        );
        setPageOfItems(response.pageOfItems);
        setCategories(response.pageOfItems);
        setFilteredCategories(response.pageOfItems);
        setPager(response.pager);
      }
    }
  };

  const FilterByName = (name) => {
    const filtered = categories.filter((category) =>
      category.firstName.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredCategories(filtered);
  };

  const deleteCategory = (id) => {
    setSelectedCategories([]);
    let categories = filteredCategories.filter((category) => {
      if (category._id === id) {
        category.isChecked = true;
        return category;
      }
    });
    setSelectedCategories([...categories]);
    toggleModal();
  };

  const handleDelete = async () => {
    let checkedIDS = [];
    selectedCategories.forEach((category) => {
      checkedIDS.push(category._id);
    });
    const response = await httpRequest.post(
      `${GET_CATEGORIES}delete`,
      checkedIDS
    );
    if (response) {
      toggleModal();
      loadPage();
    }
  };

  const getSelectedCategories = () => {
    let categories = filteredCategories.filter((category) => {
      return category.isChecked;
    });
    setSelectedCategories([...categories]);
  };

  const handleAllChecked = (e) => {
    let categories = filteredCategories;
    categories.forEach((category) => (category.isChecked = e.target.checked));
    setFilteredCategories([...categories]);
    getSelectedCategories();
  };

  const handleCheckChieldElement = (event) => {
    let categories = filteredCategories;
    categories.forEach((category) => {
      if (category._id === event.target.value)
        category.isChecked = event.target.checked;
    });
    setFilteredCategories([...categories]);
    getSelectedCategories();
  };

  return (
    <PageLayout title="Catégories" headerChildren={headerChildren}>
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
              disabled={selectedCategories.length === 0}
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
                placeholder="Rechercher une catégorie"
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
                      checked={
                        selectedCategories.length === filteredCategories.length
                      }
                      onChange={handleAllChecked}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </th>
                <th className="px-6 py-3">Nom de la catégorie</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((category, index) => (
                <tr key={index} className="bg-white border-b">
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value={category._id}
                        checked={category.isChecked}
                        onClick={handleCheckChieldElement}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>{category.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-right flex items-center justify-end space-x-2">
                      <a href={`/categories/edit/${category._id}`}>
                        <PencilIcon className="w-7 h-7 text-gray-500" />
                      </a>
                      <TrashIcon
                        className="cursor-pointer w-7 h-7 text-gray-500"
                        onClick={(e) => deleteCategory(category._id)}
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

export default CategoryList;
