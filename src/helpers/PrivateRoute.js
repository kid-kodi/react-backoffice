import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, roles, ...rest }) {
  const { user } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location },
              }}
            />
          );
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(user.profile.role) === -1) {
          // role not authorized so redirect to home page
          return <Redirect to={{ pathname: "/" }} />;
        }

        // authorized so return component
        return <Component {...props} />;
      }}
    />
  );
}

export { PrivateRoute };
