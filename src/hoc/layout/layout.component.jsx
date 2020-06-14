import React from "react";

import Navbar from "../../components/navbar/navbar.component";

import { Context } from "../../provider";

const Layout = ({ children }) => (
  <React.Fragment>
    <main>{children}</main>
    <Context.Consumer>
      {(context) => (context.state.showNavbar ? <Navbar /> : null)}
    </Context.Consumer>
  </React.Fragment>
);

export default Layout;
