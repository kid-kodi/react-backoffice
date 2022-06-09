import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProfileLayout from "../layouts/ProfileLayout";

import { FetchWrapper } from "../../helpers/apiRequest";
import { GET_USERS, NEW_USER } from "../../constants/apiEndpoints";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { countryList } from "../../Countries";
import MyTextInput from "../widgets/MyTextInput";
import MySelect from "../widgets/MySelect";
import MyCheckbox from "../widgets/MyCheckBox";

const ChangeAvatar = () => {
  const [savedUser, setSavedUser] = useState(null);
  const [countries, setCountries] = useState(countryList);
  const navigate = useNavigate();
  const httpRequest = FetchWrapper();
  const userId = useParams().id;
  const isAddMode = !userId;

  useEffect(async () => {
    if (userId) {
      const response = await httpRequest.get(`${GET_USERS}${userId}`);
      setSavedUser(response);
    }
  }, [userId]);

  const initialValues = {
    firstName: "",
    lastName: "",
    isAdmin: false,
    email: "",
    telephone: "",
    code: "+225",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Le nom est requis"),
    lastName: Yup.string().required("Un prénom est requis"),
    email: Yup.string()
      .email("Adresse email invalide")
      .required("L'adresse email est requise"),
    //code: Yup.string().required("Le code est requis"),
    telephone: Yup.string().required("Le téléphone est requis"),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, "Le mot de passe doit avoir une lettre minuscule")
      .matches(/\w*[A-Z]\w*/, "Le mot de passe doit avoir une majuscule")
      .matches(/\d/, "Le mot de passe doit avoir un nombre")
      .matches(
        /[!@#$%^&*()\-_"=+{}; :,<.>]/,
        "Le mot de passe doit avoir un caractère spécial"
      )
      .min(4, ({ min }) => `Mot de passe au moins ${min} characteres`)
      .required("Le mot de passe est requis"),
    confirPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Les mots de passe ne sont pas conforme")
      .required("Le mot de passe n'est pas conforme"),
  });

  const createUser = async (values, actions) => {
    const response = await httpRequest.post(NEW_USER, values);
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/my/users");
    }
  };
  const updateUser = async (values, actions) => {
    const response = await httpRequest.put(`${GET_USERS}${userId}`, values);
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/my/users");
    }
  };

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createUser(values, actions);
    } else {
      updateUser(values, actions);
    }
  };

  return (
    <ProfileLayout title="Changer d'avatar">
      <Formik
        initialValues={savedUser || initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <MyTextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            label="Mot de passe"
            name="password"
            type="password"
          />
          <MyTextInput
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            label="Re-entrer le mot de passe"
            name="confirPassword"
            type="password"
          />

          <div className="border-t border-gray-300 py-4 flex item-center justify-between space-x-2">
            <Link
              className="px-4 py-2 border border-gray-300 text-gray-900 rounded bg-gray-100 hover:bg-gray-200 text-2xl font-thin"
              to="/my/users"
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
    </ProfileLayout>
  );
};

export default ChangeAvatar;
