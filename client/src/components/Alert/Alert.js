import React, { Fragment } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import Clearfix from 'components/Clearfix/Clearfix.js';

import styles from 'assets/jss/material-kit-react/views/componentsSections/notificationsStyles.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

const Alert = ({ alerts }) => {
  const classes = useStyles();

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div className={classes.section} id='notifications'>
        <SnackbarContent
          key={alert.id}
          message={<span>{alert.msg}</span>}
          close
          color={alert.alertType}
          icon='info_outline'
        />
        <Clearfix />
      </div>
    ))
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
