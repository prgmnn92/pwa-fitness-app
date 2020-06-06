import React from 'react';

import Navbar from '../../components/navbar/navbar.component';

const Layout = ({ children }) => (
	<React.Fragment>
		<main>{children}</main>
		<Navbar />
	</React.Fragment>
);

export default Layout;
