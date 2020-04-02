// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';

//import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';

import adminDashboardRoutes from '../../components/Routing/adminDashboardRoutes';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const useStyles = makeStyles(styles);

const AdminDashboard = rest => {
  console.log('inside admin dashboard')
  console.log('rest in admin dashboard' , rest)
  console.log('rest children for admin dashboard', rest.children)
  // states and functions
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
      }}
    >
     <div>
        <Sidebar
          routes={adminDashboardRoutes}
          logoText={'Creative Tim'}
          logo={logo}
          // color={color}
          {...rest}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className={classes.content}>
          <div className={classes.innerContainer}>{rest.location.pathname}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminDashboard);
