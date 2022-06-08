import React from "react";
import { Route, Switch } from "react-router-dom";

import Register from "./Register";
import VerifyEmail from "./VerifyEmail";
import Login from "./Login";
import ChangeMyPassword from "./ChangeMyPassword";
import ForgortPassword from "./ForgotPassword";

function Auth({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}/register`} component={Register} />
      <Route exact path={`${path}/checkemail`} component={VerifyEmail} />
      <Route exact path={`${path}/login`} component={Login} />
      <Route exact path={`${path}/forgotpass`} component={ForgortPassword} />
      <Route exact path={`${path}/changepass`} component={ChangeMyPassword} />
    </Switch>
  );
}

export { Auth };
