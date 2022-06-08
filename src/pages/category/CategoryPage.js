import React, { useEffect, useState } from "react";
import List from "../../components/Post/List";
import { GET_CATEGORIES } from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";

import { SearchIcon, PlusSmIcon } from "@heroicons/react/outline";

const CategoryPage = () => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
    setFilteredCategories(response);
  }, []);

  const FilterByName = (name) => {
    const filtered = categories.filter((category) =>
      category.name.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredCategories(filtered);
  };

  const deleteCategory = async (id) => {
    const response = await httpRequest.remove(`${GET_CATEGORIES}${id}`);
    if (response) {
    }
  };

  return (
    <main className="max-w-7xl mx-auto sm:px-16">
      <section>
        <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-slate-900">
              Categories
            </h2>
            <a
              href="/categories/add"
              className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <PlusSmIcon className="w-6 h-6" />
              Nouvelle categorie
            </a>
          </div>
          <form className="group flex items-center relative">
            <SearchIcon className="w-6 h-6 absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" />
            <input
              className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
              type="text"
              aria-label="Filtrer les articles"
              placeholder="Filtrer les articles..."
              onChange={(e) => FilterByName(e.target.value)}
            />
          </form>
        </header>
        <List>
          {filteredCategories.map((category) => (
            <div className="flex items-center justify-between">
              <span>{category.name}</span>
              <div className="flex items-center space-x-2">
                <a
                  className="rounded-full border-2 border-blue-40 bg-blue-400 text-white px-4 p-2"
                  href={`/categories/edit/${category._id}`}
                >
                  Modifier
                </a>
                <button
                  className="rounded-full border-2 border-blue-400 text-blue-400 px-4 p-2"
                  onClick={deleteCategory}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </List>
      </section>
    </main>
  );
};

export default CategoryPage;
