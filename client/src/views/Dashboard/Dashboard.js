// import React, { Fragment, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from 'components/CustomButtons/Button.js';
// import Parallax from "components/Parallax/Parallax.js";
// import { makeStyles } from "@material-ui/core/styles";
// import styles from "assets/jss/material-kit-react/views/landingPage.js"
// import Spinner from './Spinner';
// import {getUserProfile,deleteProfile} from '../../actions/profile';

// const useStyles = makeStyles(styles);
// const Dashboard = ({getUserProfile, deleteProfile,
//   auth : {user}, 
//   profile:{profile,loading}}) => {
//     const classes = useStyles();
//   useEffect(() => {
//     console.log('inside dashboard getuser')
//     getUserProfile();
//   },[getUserProfile]);

//   const onSubmit = e => {
//     deleteProfile();
//   };

//   return loading && profile === null ? (<Spinner/> ): ( <Fragment>
//     <Parallax filter image={require("assets/img/landing-bg.jpg")}>
//         <div className={classes.landingContainer}>
//           <GridContainer>
//             <form className={classes.form} onSubmit={e => onSubmit(e)}>
//                 <h4>Welcome {user && user.name}</h4>
//                 <br/>
//                 <Button type='submit'>Delete Account</Button>
//                 </form>
//           </GridContainer>
//         </div>
//     </Parallax>
// </Fragment>);
// };

// Dashboard.propTypes = {
//   getUserProfile : PropTypes.func.isRequired,
//   deleteProfile : PropTypes.func.isRequired,
//   auth : PropTypes.object.isRequired,
//   profile : PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   profile : state.profile
// });

// export default connect(mapStateToProps, {getUserProfile,deleteProfile})(Dashboard);

import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Parallax from "components/Parallax/Parallax.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from 'components/CustomButtons/Button.js';
// import Parallax from "components/Parallax/Parallax.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/views/landingPage.js"
import {getUserProfile} from '../../actions/profile';
import Spinner from './Spinner';

const useStyles = makeStyles(styles);
const Dashboard = ({getUserProfile,
   auth:{user}, 
  profile : {profile, loading}}) => {
  const classes = useStyles();
  useEffect(() => {
    getUserProfile();
  }, []);
  return loading && profile === null ? <Spinner/> : ( <Fragment>
  <Parallax filter image={require("assets/img/landing-bg.jpg")}>
    <div className={classes.landingContainer}>
      <GridContainer>
         <form className={classes.form}>
             <h4>Welcome {user && user.name}</h4>
             <br/>
             {profile !== null ? <Fragment>has</Fragment> :
             <Fragment>has not</Fragment>}
             
        </form>
     </GridContainer>
    </div>
  </Parallax>
  </Fragment>
  );

};

Dashboard.propTypes = {
  getUserProfile : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired,
  profile : PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps,{getUserProfile})(Dashboard);
