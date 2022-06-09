import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageLayout from "../layouts/PageLayout";

import { FetchWrapper } from "../../helpers/apiRequest";
import { GET_CATEGORIES, NEW_CATEGORY } from "../../constants/apiEndpoints";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import MyTextInput from "../widgets/MyTextInput";
import MyCheckbox from "../widgets/MyCheckBox";

const CategoryEdit = () => {
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
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Le nom est requis"),
  });

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
  const updateCategory = async (values, actions) => {
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

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createCategory(values, actions);
    } else {
      updateCategory(values, actions);
    }
  };

  return (
    <PageLayout title="Créer un utilisateur">
      <Formik
        initialValues={savedCategory || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <MyTextInput
            label="Nom de la catégorie"
            name="name"
            type="text"
            placeholder="Jane"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />

          <MyCheckbox name="isPublic">à publier ?</MyCheckbox>

          <div className="border-t border-gray-300 py-4 flex item-center justify-between space-x-2">
            <Link
              className="px-4 py-2 border border-gray-300 text-gray-900 rounded bg-gray-100 hover:bg-gray-200 text-2xl font-thin"
              to="/categories"
            >
              Annuler
            </Link>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded text-2xl font-thin"
              type="submit"
            >
              Enregistrer
            </button>
          </div>
        </Form>
      </Formik>
    </PageLayout>
  );
};

export default CategoryEdit;
