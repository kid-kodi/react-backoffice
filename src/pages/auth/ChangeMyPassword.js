import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useLocation, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { RESET_PASSWORD } from "../../constants/apiEndpoints";
import { RefreshIcon } from "@heroicons/react/outline";
import { FetchWrapper } from "../../helpers/apiRequest";
import { alertService } from "../../helpers/alert";
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const ChangeMyPassword = () => {
  let query = useQuery();
  let token = query.get("token");

  const request = FetchWrapper();
  let history = useHistory();
  let location = useLocation();

  const handleSubmit = async (values, { setSubmitting }) => {
    alertService.clear();
    request
      .post(`${RESET_PASSWORD}`, values)
      .then((response) => {
        if (!response.error) {
          alertService.error(response.message);
          let { from } = location.state || {
            from: { pathname: "/login" },
          };
          history.push(from);
        } else {
          alertService.error(
            "La réinitialisation de votre mot de passe a échouée"
          );
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Changer de mot de passe</h1>
        <Formik
          initialValues={{
            token: token,
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string().required("Renseigner le mot de passe"),
            passwordConfirmation: Yup.string()
              .oneOf(
                [Yup.ref("password"), null],
                "Le mot de passe n'est pas conforme"
              )
              .required("Renseigner le mot de passe de confirmation"),
          })}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="">
              <div className="my-2">
                <label htmlFor="password">Nouveau mot de passe</label>
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

              <div className="my-2">
                <label htmlFor="passwordConfirmation">
                  Re-entrer le Mot de passe
                </label>
                <div>
                  <Field
                    className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                    name="passwordConfirmation"
                    type="password"
                  />
                  <span className="text-red-400 text-sm">
                    <ErrorMessage name="passwordConfirmation" />
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
                    "Changer de mot de passe"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangeMyPassword;
