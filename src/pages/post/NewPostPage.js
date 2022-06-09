import React, { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";
import { FetchWrapper } from "../../helpers/apiRequest";
import {
  GET_CATEGORIES,
  GET_POSTS,
  NEW_POSTS,
  UPLOAD_IMG,
} from "../../constants/apiEndpoints";
import { CameraIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, CheckboxGroup } from "../../components/Input";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewPostPage = () => {
  const [image, setImage] = useState(null);
  const [savedPost, setSavedPost] = useState(null);
  const [coverPicture, setCoverPicture] = useState(
    "https://skillz4kidzmartialarts.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
  );
  const [categories, setCategories] = useState([]);

  const history = useHistory();
  const httpRequest = FetchWrapper();
  const postId = useParams().id;

  const isAddMode = !postId;

  useEffect(async () => {
    const response = await httpRequest.get(GET_CATEGORIES);
    setCategories(response);
  }, []);

  useEffect(async () => {
    if (postId) {
      const response = await httpRequest.get(`${GET_POSTS}${postId}`);
      setSavedPost(response);
      setCoverPicture(response.coverPicture);
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

  const onImageUrlChange = async (e) => {
    setCoverPicture(e);
  };

  const initialValues = {
    title: "",
    coverPicture: "",
    categories: [],
    description: "",
    isVisible: false,
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(3).required("Informations requise"),
    categories: Yup.array().required("Choisir au moins une categorie"),
    description: Yup.string().min(3).required("Informations requise"),
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
    const response = await httpRequest.post(NEW_POSTS, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      history.push("/");
    }
  };

  const updatePost = async (values, actions) => {
    values.coverPicture = coverPicture;
    const response = await httpRequest.put(`${GET_POSTS}${postId}`, values);
    if (response) {
      setTimeout(() => {
        actions.setSubmitting(false);
      }, 3000);
      history.push("/");
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
                  <div className="flex">
                    <ReactQuill
                      className="w-full h-[500px] mb-10"
                      value={values.description}
                      onChange={(e) => setFieldValue("description", e)}
                    />
                  </div>

                  <div>
                    <h2 className="text-xl my-3">Categories</h2>
                    <CheckboxGroup
                      id="categories"
                      label="selection des categories"
                      value={values.categories}
                      error={errors.categories}
                      touched={touched.categories}
                      onChange={setFieldValue}
                      onBlur={setFieldTouched}
                    >
                      {categories &&
                        categories.map((c) => (
                          <Field
                            key={c._id}
                            component={Checkbox}
                            name="categories"
                            id={c._id}
                            label={c.name}
                          />
                        ))}
                    </CheckboxGroup>
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
                      href="/"
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

export default NewPostPage;
