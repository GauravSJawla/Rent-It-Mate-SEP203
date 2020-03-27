import React from 'react';

// core components
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import Clearfix from 'components/Clearfix/Clearfix.js';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
      <div id='notifications'>
        <SnackbarContent
          message={
            <span>
              <b>DANGER ALERT:</b> {' ' + alert.msg}
            </span>
          }
          close
          key={alert.id}
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
