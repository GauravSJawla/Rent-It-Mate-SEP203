// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router';
import {Route} from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import People from '@material-ui/icons/People';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/icons/List';

//import bgImage from 'assets/img/sidebar-2.jpg';
import logo from 'assets/img/reactlogo.png';
import ListUsers from 'views/ProfilePage/ListUsers';
import ViewCategories from 'views/CategoryPage/ViewCategories';
import CategoryPage from  'views/CategoryPage/CategoryPage';
//import adminDashboardRoutes from '../../components/Routing/adminDashboardRoutes';
import { whiteColor } from 'assets/jss/material-dashboard-react';

const useStyles = makeStyles(styles);

const adminDashboardRoutes = [
  {
      path: '/all-users',
      name: 'Users',
      icon: People,
      component: ListUsers,
      layout: '/admin-dashboard'
  },
    {
      path: '/all-categories',
      name: 'Categories',
      icon: List,
      component: ViewCategories,
      layout: '/admin-dashboard'
      },
    {
      path:'/all-subcategories',
      name: 'Subcategories',
      icon: List,
      component: ViewCategories,
      layout: '/admin-dashboard'
    },
    {
      path:'/all-products',
      name: 'Products',
      icon: List,
      component: ViewCategories,
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
