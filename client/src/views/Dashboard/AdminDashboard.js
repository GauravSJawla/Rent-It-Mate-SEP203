// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import Person from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';


//import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import ListUsers from 'views/ProfilePage/ListUsers';
import CategoryPage from 'views/CategoryPage/CategoryPage';
//import adminDashboardRoutes from '../../components/Routing/adminDashboardRoutes';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const useStyles = makeStyles(styles);

const adminDashboardRoutes = [
  {
      path: '/all-users',
      name: 'All users',
      icon: Person,
      component: ListUsers,
      layout: '/admin-dashboard'
  },
  {
      path: '/category',
      name: 'Add Category',
      icon: AddIcon,
      component: CategoryPage,
      layout: '/admin-dashboard'
    }
];

const AdminDashboard = (rest) => {
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
          <div className={classes.innerContainer}>
          {adminDashboardRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.layout + route.path}
              component={route.component}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AdminDashboard);
