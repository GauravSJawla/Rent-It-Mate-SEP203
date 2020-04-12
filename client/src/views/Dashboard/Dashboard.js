// eslint-disable-next-line
import React from 'react';
import { withRouter } from 'react-router';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

import styles from 'assets/jss/material-kit-react/views/dashboardPage.js';
// core components
import Sidebar from 'components/Sidebar/Sidebar.js';
import logo from 'assets/img/reactlogo.png';

import dashboardRoutes from '../../components/Routing/dashboardRoutes';


const useStyles = makeStyles(styles);

const Dashboard = rest => {
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
          routes={dashboardRoutes}
          logoText={'Creative Tim'}
          logo={logo}
          {...rest}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div className={classes.content}>
          <div className={classes.innerContainer}>{rest.children}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
