import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router";
import { FetchWrapper } from "../../helpers/apiRequest";
import { GET_USERS, NEW_USER } from "../../constants/apiEndpoints";
import { CameraIcon } from "@heroicons/react/outline";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Checkbox, CheckboxGroup } from "../../components/Input";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { countryList } from "../../Countries";

const NewUserPage = () => {
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
    code: "+225",
    telephone: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Champs requis"),
    lastName: Yup.string().required("Champs requis"),
    telephone: Yup.string().required("Champs requis"),
    email: Yup.string()
      .email("Adresse e-mail invalide")
      .required("Champs requis"),
    password: Yup.string().required("Champs requis"),
  });

  const handleSubmit = async (values, actions) => {
    if (isAddMode) {
      createPost(values, actions);
    } else {
      updatePost(values, actions);
    }
  };

  const createPost = async (values, actions) => {
    const response = await httpRequest.post(NEW_USER, values);
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/users");
    }
  };

  const updatePost = async (values, actions) => {
    const response = await httpRequest.put(`${GET_USERS}${userId}`, values);
    if (response) {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }, 3000);
      navigate("/users");
    }
  };

  return (
    <div className="max-w-7xl mx-auto sm:px-16">
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full space-y-8">
          <h1 className="text-2xl">Nouveau utilisateur</h1>
          <Formik
            initialValues={savedUser || initialValues}
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
                    <label className="" htmlFor="firstName">
                      Nom
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="firstName"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="firstName" />
                      </span>
                    </div>
                  </div>

                  <div className="my-2">
                    <label className="" htmlFor="lastName">
                      Prénoms
                    </label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="lastName"
                        type="text"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="lastName" />
                      </span>
                    </div>
                  </div>

                  <div className="my-2">
                    <label htmlFor="telephone">Telephone</label>
                    <div className="flex items-center justify-start">
                      <div>
                        <Field
                          as="select"
                          name="code"
                          className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        >
                          <option value="">Choisir dans la liste</option>
                          {countries &&
                            countries.map((country, index) => (
                              <option key={index} value={country.dial_code}>
                                {country.dial_code}
                              </option>
                            ))}
                        </Field>
                      </div>
                      <div className="flex-1">
                        <Field
                          className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                          name="telephone"
                          type="text"
                        />
                        <span className="text-red-400 text-sm">
                          <ErrorMessage name="telephone" />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="my-2">
                    <label htmlFor="email">E-mail Adresse</label>
                    <div>
                      <Field
                        name="email"
                        type="email"
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="email" />
                      </span>
                    </div>
                  </div>

                  <div className="my-2">
                    <label htmlFor="password">Mot de passe</label>
                    <div>
                      <Field
                        className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                        name="password"
                        type="password"
                      />
                      <span className="text-red-400 text-sm">
                        <ErrorMessage name="password" />
                      </span>
                    </div>
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
                      href="/users"
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

export default NewUserPage;
