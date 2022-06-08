import React from "react";
import { ArrowNarrowLeftIcon } from "@heroicons/react/solid";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditProfile = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <a href="/me" className="block hover:bg-gray-100 rounded-full p-2">
          <ArrowNarrowLeftIcon className="w-6 h-6" />
        </a>
        <h1 className="text-2xl">Modifier votre profile</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            telephone: "",
            email: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Champs requis"),
            lastName: Yup.string().required("Champs requis"),
            telephone: Yup.string().required("Champs requis"),
            email: Yup.string()
              .email("Adresse e-mail invalide")
              .required("Champs requis"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="">
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
              <label htmlFor="lastName">Prenoms</label>
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
              <div>
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

            <div className="my-2">
              <label htmlFor="email">Email Address</label>
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

            <div className="my-4">
              <button
                className="block w-full bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                type="submit"
              >
                Enregistrer
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default EditProfile;
