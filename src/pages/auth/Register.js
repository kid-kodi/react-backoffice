import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertService } from "../../helpers/alert";
import { REGISTER } from "../../constants/apiEndpoints";
import { RefreshIcon } from "@heroicons/react/outline";
import { countryList } from "./Countries";
import { FetchWrapper } from "../../helpers/apiRequest";

const Register = () => {
  const request = FetchWrapper();
  let history = useHistory();
  let location = useLocation();
  const [countries, setCountries] = useState(countryList);

  const handleSubmit = async (values, { setSubmitting }) => {
    alertService.clear();
    request
      .post(`${REGISTER}`, values)
      .then((response) => {
        if (!response.error) {
          let { from } = location.state || {
            from: { pathname: "/auth/checkemail" },
          };
          history.push(from);
        } else {
          alertService.error("Votre enregistrement a échouée");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">S'enregistrer</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            code: "+225",
            telephone: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().required("Champs requis"),
            lastName: Yup.string().required("Champs requis"),
            telephone: Yup.string().required("Champs requis"),
            email: Yup.string()
              .email("Adresse e-mail invalide")
              .required("Champs requis"),
            password: Yup.string().required("Champs requis"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
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

              <div className="my-4">
                <button
                  className="flex items-center justify-center w-full bg-blue-400 text-white rounded-full px-4 py-2 hover:bg-blue-500"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <RefreshIcon
                      className="animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    />
                  ) : (
                    "Enregistrer"
                  )}
                </button>
              </div>

              <div className="my-4">
                <a
                  href="/auth/login"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Deja connecte ?
                </a>
              </div>

              <div className="my-4">
                <a
                  href="/auth/forgotpass"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  mot de passe oublie ?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
