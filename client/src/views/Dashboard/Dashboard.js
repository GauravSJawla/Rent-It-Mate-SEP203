// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
import Person from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';

import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import logo from 'assets/img/reactlogo.png';

import DashboardProfile from 'views/Dashboard/DashboardProfile';
import ProductPage from 'views/ProductPage/CreateProduct';
import ViewProduct from 'views/ProductPage/ViewProducts';

const useStyles = makeStyles(styles);
const dashboardRoutes = [
  {
    path: '/user',
    name: 'User Profile',
    icon: Person,
    component: DashboardProfile,
    layout: '/dashboard',
  },
  {
    path: '/create-product',
    name: 'Add Product',
    icon: AddIcon,
    component: ProductPage,
    layout: '/dashboard',
  },
  {
    path: '/products',
    name: 'View My Products',
    icon: AddIcon,
    component: ViewProduct,
    layout: '/dashboard',
  },
];

const Dashboard = (rest) => {
  const classes = useStyles();
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
      }}
    >
      <div>
        <Sidebar
          routes={dashboardRoutes}
          logoText={'Creative Tim'}
          logo={logo}
          {...rest}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className={classes.content}>
          <div className={classes.innerContainer}>
            {dashboardRoutes.map((route) => (
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

export default withRouter(Dashboard);
