import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/solid";

import PostItem from "../components/PostItem";

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY,
} from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";
import { useSearchParams } from "react-router-dom";
import Track from "../components/Track";
import Search from "../components/Search";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [pageOfItems, setPageOfItems] = useState([]);
  const [pager, setPager] = useState();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let category = new URLSearchParams(window.location.search).get("category");
  let title = new URLSearchParams(window.location.search).get("title");

  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page && params.category && params.title) {
      loadPage();
    } else {
      setSearchParams({ page: 1, category: "all", title: "all" });
    }
  }, [searchParams]);

  const loadPage = async () => {
    const params = Object.fromEntries([...searchParams]);
    if (params.page) {
      //get page of items from api
      const page = parseInt(params.page) || 1;
      const category = params.category;
      const title = params.title;
      if (page !== currentPage) {
        const response = await httpRequest.get(
          `${GET_POSTS}list?category=${category}&title=${title}&page=${page}`
        );
        setPageOfItems(response.pageOfItems);
        setPosts(response.pageOfItems);
        setFilteredPosts(response.pageOfItems);
        setPager(response.pager);
      }
    }
  };

  // Searching...
  useEffect(async () => {
    if (!search) return setSearchResults([]);
    const params = Object.fromEntries([...searchParams]);
    setSearchParams({
      page: params.page,
      category: params.category,
      title: search,
    });
  }, [search]);

  let onCategoryClick = (id) => {
    const params = Object.fromEntries([...searchParams]);
    setSearchParams({ page: params.page, category: id, title: "" });
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
    <div className="mx-auto max-w-6xl py-4 h-screen">
      {/* <Search search={search} setSearch={setSearch} /> */}
      <div className="gap-x-8 w-full md:relative py-10 flex items-center justify-between h-[60px]">
        <h1 className="text-5xl font-thin w-[370px]">Articles</h1>
        <div className="w-full flex items-center space-x-4">
          <form
            onSubmit={handleSearch}
            className="w-full flex items-center border border-gray-300 text-gray-900 rounded-lg p-2"
          >
            <input
              type="text"
              id="table-search"
              name="title"
              className="flex-1 border-0 block w-80 pl-10"
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
                  <option value={category._id} key={index}>
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
      <div className="grid overflow-y-scroll scrollbar-hide h-96 py-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {posts.map((post, index) => {
          return <PostItem key={index} post={post} />;
        })}
      </div>
      <div className="flex gap-x-8 absolute min-w-full md:relative py-10">
        {/* Genres */}
        {/* <div className="hidden xl:inline max-w-[270px]">
          <h2 className="text-3xl font-thin mb-10">Catégories</h2>
          <div className="flex gap-x-2 gap-y-2.5 flex-wrap mb-3">
            {categories.map((category, index) => {
              return (
                <button
                  onClick={() => onCategoryClick(category._id)}
                  key={index}
                  className="genre"
                >
                  {category.name}
                </button>
              );
            })}
          </div>
          <button className="btn">Toutes les catégories</button>
        </div> */}

        {/* Tracks */}
        <div className="w-full">
          <h2 className="text-3xl font-thin text-gray-700 mb-10">Nouveautés</h2>
          <div className="space-y-3 border-2 border-[#eee] rounded-2xl py-3 overflow-y-scroll h-[1000px] md:h-96 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-thumb-rounded hover:scrollbar-thumb-gray-500 w-[830px]">
            {posts.map((post, index) => {
              return <Track key={index} post={post} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
