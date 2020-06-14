import React from "react";
import { connect } from "react-redux";

import Navbar from "../../components/navbar/navbar.component";

const Layout = ({ children, showNavbar }) => (
  <React.Fragment>
    <main>{children}</main>
    {showNavbar && <Navbar />}
  </React.Fragment>
);

const mapStateToProps = (state) => ({
  showNavbar: state.ui.showNavbar,
});

export default connect(mapStateToProps)(Layout);
