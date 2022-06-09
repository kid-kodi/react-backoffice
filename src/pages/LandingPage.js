import React, { useEffect, useState } from "react";

import { ImagesData } from "../mocks/Database";

import {
  GET_POSTS,
  GET_CATEGORIES,
  GET_POSTS_BY_CATEGORY,
} from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";

import ImageSlider from "../components/Landing/ImageSlider";
import RecentsPost from "../components/Landing/RecentsPost";
import CategoryList from "../components/Landing/CategoryList";
import PopularPost from "../components/Landing/PopularPost";
import ExclusifPost from "../components/Landing/ExclusifPost";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  let category = new URLSearchParams(window.location.search).get("category");

  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(
      `${category ? GET_POSTS_BY_CATEGORY + category : GET_POSTS}`
    );
    setPosts(response);
  }, []);

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden m-0">
      <ImageSlider slides={ImagesData} />
      <RecentsPost />
      <CategoryList />
      <PopularPost />
      <ExclusifPost />
    </div>
  );
};

export default LandingPage;
