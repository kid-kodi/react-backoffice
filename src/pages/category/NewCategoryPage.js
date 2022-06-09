import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import { FetchWrapper } from "../../helpers/apiRequest";
import { GET_CATEGORIES, NEW_CATEGORY } from "../../constants/apiEndpoints";
import { CameraIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, CheckboxGroup } from "../../components/Input";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const NewCategoryPage = () => {
  const [savedCategory, setSavedCategory] = useState(null);

  const navigate = useNavigate();
  const httpRequest = FetchWrapper();
  const categoryId = useParams().id;

  const isAddMode = !categoryId;

  useEffect(async () => {
    if (categoryId) {
      const response = await httpRequest.get(`${GET_CATEGORIES}${categoryId}`);
      setSavedCategory(response);
    }
  }, [categoryId]);

  const initialValues = {
    name: "",
    isVisible: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).required("Informations requise"),
  });

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createCategory(values, actions);
    } else {
      uodateCategory(values, actions);
    }
  };

  const createCategory = async (values, actions) => {
    const response = await httpRequest.post(NEW_CATEGORY, values);
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/categories");
    }
  };

  const uodateCategory = async (values, actions) => {
    const response = await httpRequest.put(
      `${GET_CATEGORIES}${categoryId}`,
      values
    );
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/categories");
    }
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-16">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full space-y-8">
          <h1 className="text-2xl">Nouvel catégorie d'article</h1>
          <Formik
            initialValues={savedCategory || initialValues}
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

                  <div className="my-2">
                    <label className="" htmlFor="name">
                      Name
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="name"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="name" />
                      </span>
                    </div>
                  </div>

                  <div className="my-4">
                    <h2>Visibilité de la catégorie</h2>
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
                      href="/categories"
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

export default NewCategoryPage;
