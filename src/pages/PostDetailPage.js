import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";
import { GET_POSTS } from "../constants/apiEndpoints";
import { FetchWrapper } from "../helpers/apiRequest";

const PostDetailPage = () => {
  const [post, setPost] = useState({});

  const { id } = useParams();
  const history = useHistory();
  const httpRequest = FetchWrapper();

  useEffect(async () => {
    const response = await httpRequest.get(`${GET_POSTS}${id}`);
    setPost(response);
  }, []);

  const deletePost = async () => {
    const response = await httpRequest.remove(`${GET_POSTS}${id}`);
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
              href={`/posts/edit/${id}`}
            >
              Modifier
            </a>
            <button
              className="border-2 border-green-700 mb-5 inline-flex rounded-full p-2 bg-green-700 text-white hover:bg-green-500 hover:border-green-500"
              onClick={deletePost}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        </nav>
        <h1 className="text-3xl text-gray-700 font-bold">{post.title}</h1>
        <>
          {post.categories?.map((category, index) => (
            <div className="text-green-600" key={index}>
              <dt className="sr-only">Runtime</dt>
              <dd className="flex items-center">{category.name}</dd>
            </div>
          ))}
        </>
        <p className="text-xs text-gray-400 font-semibold">{post.createdAt}</p>
      </header>
      <div className="w-full">
        <img
          className="w-full h-[400px] border-2 rounded-md object-cover"
          src={post.coverPicture}
        />
      </div>
      <article className="py-5">
        <div dangerouslySetInnerHTML={{ __html: post.description }} />
      </article>
    </main>
  );
};

export default PostDetailPage;
