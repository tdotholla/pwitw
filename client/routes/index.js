import React from "react";

//Routes
import { Route, Switch } from "react-router-dom";

//Code Splitting
// import { asyncComponent } from "../hocs/asyncComponent";

//Components
import ReadMePage from "./../components/pages/Readme";
import AppMap from "./../components/pages/Landing";

//Auth
export const LANDING = "/";
export const README = "/readme";
export const SINGLE_DEVICE = "/devices/:hostname";

//Routes Object
const routes = (
  <div>
    <Switch>
      <Route exact path={LANDING} component={AppMap} />
      <Route name="ReadMePage" path={README} component={ReadMePage} />
      <Route name="SingleDevice" path={SINGLE_DEVICE} component={null} />
    </Switch>
  </div>
);

export default routes;
