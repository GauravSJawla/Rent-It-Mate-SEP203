// eslint-disable-next-line
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Header from "components/Header/Header";
import HeaderLinks from "components/Header/HeaderLinks";
import PrivateRoute from "components/Routing/PrivateRoute";
import LandingPage from "views/LandingPage/LandingPage";
import LoginPage from "views/LoginPage/LoginPage";
import RegisterPage from "views/RegisterPage/RegisterPage";
//import UpdateProduct from 'views/ProductPage/UpdateProduct';
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "views/Dashboard/Dashboard";
import EmailVerifyPage from "views/EmailVerifyPage/EmailVerifyPage";
import CreateProfile from "views/ProfilePage/CreateProfile";
import EditProfile from "views/ProfilePage/EditProfile";
import AdminDashboard from "views/Dashboard/AdminDashboard";
import Alert from "./components/Layout/Alert";
import CategoryPage from "./views/CategoryPage/CategoryPage";
import UpdateCategoryPage from "./views/CategoryPage/UpdateCategoryPage";
import SubCategoryPage from "./views/SubCategoryPage/SubCategoryPage";
import ProductDetail from "./views/ProductPage/ProductDetail";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // expose store when run in Cypress
  if (window.Cypress) {
    window.store = store;
  }
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Alert />
          <Header
            color="primary"
            brand="Rent It Mate!"
            rightLinks={<HeaderLinks />}
          />
          <Route exact path="/" component={LandingPage} />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path='/single-product-details' component={ProductDetail} />
            {/**/}
            {/*<Route
              exact
              path="/single-product-details/:id"
              component={ProductDetail}
            />*/}
            <PrivateRoute
              exact
              path="/create-profile"
              component={CreateProfile}
            />
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            {/* <PrivateRoute
              exact
              path='/create-product'
              component={ProductPage}
            /> */}
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/admin-dashboard" component={AdminDashboard} />
            <PrivateRoute exact path="/add-category" component={CategoryPage} />
            <PrivateRoute
              exact
              path="/add-sub-category"
              component={SubCategoryPage}
            />
            <PrivateRoute
              exact
              path="/update-category/:id"
              component={UpdateCategoryPage}
            />

            {/* <PrivateRoute exact path='/product/:id' component={UpdateProduct} /> */}
            <Route exact path="/emailVerifyPage" component={EmailVerifyPage} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
