import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import VidlyNavbar from "./VidlyNavbar";

import Selector from "./customized/selector";
class Main extends Component {
  render() {
    return (
      <main className="container">
        <VidlyNavbar />
        <br/> <br/>
        <Selector/>
      </main>
    );
  }
}

export default Main;
