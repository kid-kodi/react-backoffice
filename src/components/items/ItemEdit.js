import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router";

import { CameraIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Checkbox, CheckboxGroup } from "../Input";
import {
  GET_CATEGORIES,
  GET_ITEMS,
  NEW_ITEM,
  UPLOAD_IMG,
} from "../../constants/apiEndpoints";
import { FetchWrapper } from "../../helpers/apiRequest";

const ItemEdit = () => {
  const [image, setImage] = useState(null);
  const [savedPost, setSavedPost] = useState(null);
  const [coverPicture, setCoverPicture] = useState(
    "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
  );
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const httpRequest = FetchWrapper();
  const postId = useParams().id;

  const isAddMode = !postId;

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    if (postId) {
      const response = await httpRequest.get(`${GET_ITEMS}${postId}`);
      setSavedPost(response);
      setCoverPicture(response.coverPicture);
      setImages(response.images);
    }
  }, [postId]);

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("imageMsg", file, file.name);
    const response = await httpRequest.post(UPLOAD_IMG, formData);
    if (response) {
      setImage(file);
      setCoverPicture(response);
    }
  };

  const handleOtherUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("imageMsg", file, file.name);
    const response = await httpRequest.post(UPLOAD_IMG, formData);
    if (response) {
      setImages([...images, response]);
    }
  };

  const onImageUrlChange = async (e) => {
    setCoverPicture(e);
  };

  const initialValues = {
    title: "",
    coverPicture: "",
    media: "text",
    category: "",
    price: "",
    description: "",
    content: "",
    isVisible: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).required("Informations requise"),
    category: Yup.string().required("Choisir au moins une categorie"),
    description: Yup.string().min(3).required("Informations requise"),
    price: Yup.string().required("Informations requise"),
  });

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createPost(values, actions);
    } else {
      updatePost(values, actions);
    }
  };

  const createPost = async (values, actions) => {
    values.coverPicture = coverPicture;
    values.images = images;
    const response = await httpRequest.post(NEW_ITEM, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate("/items");
    }
  };

  const updatePost = async (values, actions) => {
    values.coverPicture = coverPicture;
    values.images = images;
    const response = await httpRequest.put(`${GET_ITEMS}${postId}`, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      navigate(`/items`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-16">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full space-y-8">
          <h1 className="text-2xl">Nouvel article</h1>
          <Formik
            initialValues={savedPost || initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              setFieldValue,
              setFieldTouched,
              values,
              errors,
              touched,
              isSubmitting,
            }) => {
              return (
                <Form className="">
                  {errors.length > 0 &&
                    errors.map((error) => (
                      <p className="text-red-500">{error}</p>
                    ))}
                  <div className="flex space-x-2 items-center">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full h-8 w-8 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                    >
                      <input
                        className="absolute w-8 rounded-full opacity-0"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadFile(e.target.files[0])}
                      />
                      <CameraIcon className="w-8 h-8" />
                    </button>
                  </div>
                  <div>
                    <img
                      className="w-[800px] h-[400px] object-cover"
                      src={coverPicture}
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    {images &&
                      images.map((image, index) => (
                        <div key={index} className="">
                          <img
                            className="w-[100px] h-[100px] object-cover border rounded-3xl p-4"
                            src={image}
                          />
                        </div>
                      ))}
                    <div className="flex space-x-2 items-center m-2">
                      <button
                        type="button"
                        className="border inline-flex items-center rounded-3xl justify-center w-[100px] h-[100px] transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                      >
                        <input
                          className="absolute w-10 rounded-full opacity-0"
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleOtherUploadFile(e.target.files[0])
                          }
                        />
                        <CameraIcon className="w-10 h-10" />
                      </button>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="name">
                      Image de couverture
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="coverPicture"
                        type="text"
                        value={coverPicture}
                        onChange={(e) => onImageUrlChange(e.target.value)}
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="name">
                      Titre
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="title"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="price">
                      Prix
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="price"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="price" />
                      </span>
                    </div>
                  </div>
                  <div className="my-2">
                    <label className="" htmlFor="description">
                      Description
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="description"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="description" />
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <ReactQuill
                      className="w-full h-[500px] mb-10"
                      value={values.content || ""}
                      onChange={(e) => setFieldValue("content", e)}
                    />
                  </div>

                  <div>
                    <h2 className="text-xl my-3">Categories</h2>
                    <Field
                      as="select"
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
                    </Field>
                  </div>

                  <div className="my-4">
                    <h2>Visibilite de l'article</h2>
                    <Field
                      component={Checkbox}
                      name="isVisible"
                      id="isVisible"
                      label="Publier ?"
                    />
                  </div>

                  <div className="flex items-center justify-between my-4">
                    <button
                      className="flex items-center justify-center bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      {isSubmitting ? "Loading..." : "Enregistrer"}
                    </button>
                    <a
                      className="flex items-center border-2 border-blue-400 justify-center bg-white text-blue-600 rounded-full px-4 py-2 hover:bg-blue-100"
                      href="/items"
                    >
                      Annuler
                    </a>
                  </div>
                  {/* <pre>
                    {JSON.stringify(
                      {
                        handleSubmit,
                        setFieldValue,
                        setFieldTouched,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                      },
                      null,
                      2
                    )}
                  </pre> */}
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ItemEdit;
