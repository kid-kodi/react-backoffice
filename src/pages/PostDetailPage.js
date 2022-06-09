import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GET_POSTS } from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";
import { formatToDate } from "../helpers/utility";

const PostDetailPage = () => {
  const [post, setPost] = useState({});
  const [categories, setCategories] = useState([]);

  const { id } = useParams();
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(`${GET_POSTS}${id}`);
    setPost(response);
    setCategories(response.categories);
    console.log(categories);
  }, []);

  return (
    <div className="w-screen h-screen">
      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <header className="py-4">
          <a
            className="border-2 border-green-700 mb-5 inline-flex rounded-full p-2 text-green-700 hover:text-green-500 hover:border-green-500"
            href="/posts"
          >
            <ArrowLeftIcon className="w-6 h-6" />
            <span className="px-2">Retour</span>
          </a>
          <div className="flex items-center space-x-5">
            {post.categories?.map((category, index) => (
              <div className="text-green-600" key={index}>
                <dt className="sr-only">Runtime</dt>
                <dd className="flex items-center">{category.name}</dd>
              </div>
            ))}
          </div>
          <h1 className="text-3xl text-gray-700 font-bold">{post.title}</h1>
          <h3 className="text-xl text-gray-700 font-bold">
            {post.description}
          </h3>
          <div className="text-xs text-gray-400 font-semibold">
            publié le <span>{formatToDate(post.createdAt)}</span>
          </div>
        </header>
        <div className="w-full">
          <img
            className="w-full h-[400px] border-2 rounded-md object-cover"
            src={post.coverPicture}
          />
        </div>
        <article className="py-5">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </div>
  );
};

export default PostDetailPage;
