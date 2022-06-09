import React, { useEffect, useState } from "react";
import List from "../components/Post/List";
import ListItem from "../components/Post/ListItem";
import Nav from "../components/Nav";
import NavItem from "../components/NavItem";
import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY,
} from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";

import { HomeIcon, SearchIcon, PlusSmIcon } from "@heroicons/react/outline";

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPost, setFilteredPost] = useState([]);
  const [categories, setCategories] = useState([]);

  let category = new URLSearchParams(window.location.search).get("category");

  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(
      `${category ? GET_POSTS_BY_CATEGORY + category : GET_POSTS}`
    );
    setPosts(response);
    setFilteredPost(response);
  }, []);

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  const FilterByName = (name) => {
    const filtered = posts.filter((post) =>
      post.title.toUpperCase().includes(name.toUpperCase())
    );
    setFilteredPost(filtered);
  };

  return (
    <main className="max-w-7xl mx-auto sm:px-16">
      <section>
        <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-slate-900">Articles</h2>
            <a
              href="/posts/add"
              className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
            >
              <PlusSmIcon className="w-6 h-6" />
              Nouveau
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
        <Nav>
          <NavItem href={`/posts`} isActive>
            <HomeIcon className="w-5 h-5" />
          </NavItem>
          {categories.map((category) => (
            <NavItem
              key={category._id}
              href={`/posts?category=${category._id}`}
              isActive
            >
              {category.name}
            </NavItem>
          ))}
        </Nav>
        <List>
          {filteredPost?.map((post, index) => (
            <ListItem key={index} post={post} />
          ))}
        </List>
      </section>
    </main>
  );
};

export default PostPage;
