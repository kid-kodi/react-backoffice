import React from "react";
import { Route, Switch } from "react-router-dom";

function Main({ match }) {
  const { path } = match;

  return (
    <Switch>
      <Route exact path={`${path}/profile/me`} component={Profile} />
      <Route exact path={`${path}/profile/edit`} component={EditProfile} />
    </Switch>
  );
}

export { Main };
