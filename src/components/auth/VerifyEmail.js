import { Formik, Form, Field } from "formik";
import { useHistory, useLocation, useNavigate } from "react-router-dom";

import { CHECK_EMAIL } from "../../constants/apiEndpoints";

import * as Yup from "yup";
import { RefreshIcon } from "@heroicons/react/outline";
import { FetchWrapper } from "../../helpers/apiRequest";
import { useState } from "react";

const VerifyEmail = () => {
  const [error, setError] = useState();
  let navigate = useNavigate();
  let location = useLocation();
  const request = FetchWrapper();
  const initialValues = {
    token: "",
  };

  const validationSchema = Yup.object({
    token: Yup.string().required("Renseigner le code"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await request.post(`${CHECK_EMAIL}`, values);
    if (response.error) {
      setSubmitting(false);
      setError("Identifiant incorrecte veuillez reesayer");
    } else {
      setError(
        "Votre compte utilisateur a bien ete validee veuillez vous connectez"
      );
      const { from } = location.state || {
        from: { pathname: "/auth/login" },
      };
      navigate(from);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="text-2xl">S'enregistrer</h1>
        <p>
          Inscription réussie, veuillez vérifier votre e-mail et entrer le code
          de vérification
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <Field
                className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md"
                name="token"
                type="text"
                placeholder="Entrer le code"
              />
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
                    "Vérification"
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

export default VerifyEmail;
