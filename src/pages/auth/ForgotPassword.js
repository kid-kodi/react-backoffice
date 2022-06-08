import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { FORGOT_PASSWORD } from "../../constants/apiEndpoints";
import { RefreshIcon } from "@heroicons/react/outline";
import * as Yup from "yup";
import { FetchWrapper } from "../../helpers/apiRequest";
import { alertService } from "../../helpers/alert";

const ForgortPassword = () => {
  const request = FetchWrapper();
  let location = useLocation();

  let history = useHistory();

  const handleSubmit = async (values, { setSubmitting }) => {
    alertService.clear();
    request
      .post(`${FORGOT_PASSWORD}`, values)
      .then((response) => {
        if (!response.error) {
          alertService.error(response.message);
          const { from } = location.state || {
            from: { pathname: "/auth/login" },
          };
          history.push(from);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Mot de passe oublier</h1>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Adresse e-mail invalide")
              .required("Champs requis"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="">
              <div className="my-2">
                <label htmlFor="email">Adresse e-mail</label>
                <div>
                  <Field
                    className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                    name="email"
                    type="text"
                  />
                  <span className="text-red-400 text-sm">
                    <ErrorMessage name="email" />
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
                    "Envoyer"
                  )}
                </button>
              </div>

              <div className="my-4">
                <a
                  href="/auth/register"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Pas de compte ?
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgortPassword;
