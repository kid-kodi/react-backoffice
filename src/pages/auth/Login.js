import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../../contexts/AuthContext";
import { LOGIN } from "../../constants/apiEndpoints";
import { useHistory } from "react-router-dom";
import { RefreshIcon } from "@heroicons/react/outline";
import { FetchWrapper } from "../../helpers/apiRequest";
import { alertService } from "../../helpers/alert";

const Login = () => {
  let history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const request = FetchWrapper();
  const handleSubmit = async (values, { setSubmitting }) => {
    alertService.clear();
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await request.post(LOGIN, values);
      if (response.error) {
        alertService.error("Connexion échouée", {
          keepAfterRouteChange: true,
        });
      } else {
        alertService.success("Connexion réussie", {
          keepAfterRouteChange: true,
        });
        console.log(response);
        let { profile, token } = response;
        dispatch({ type: "LOGIN_SUCCESS", payload: { profile, token } });
        history.push("/");
      }
    } catch (error) {
      alertService.error("Identifiant incorrecte veuillez reesayer");
      setSubmitting(false);
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">Se connecter</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
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
                    "Connexion"
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

export default Login;
