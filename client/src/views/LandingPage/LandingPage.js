import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// enhancement packages

// core components
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
import ProductGallary from "components/ProductGallary/ProductGallary.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";

// Sections for this page
import Carousel from "views/Components/Sections/SectionCarousel";

const useStyles = makeStyles(styles);

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div>
      <Parallax filter image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.landingContainer}>
          <GridContainer>
            <GridItem xs={8} sm={8} md={4}>
              <h1 className={classes.title}>Your Story Starts With Us.</h1>
              <h4>
                Rent It Mate is a platform for you to rent out your rarely used
                stuff and earn some money on it. So why wait? Sign Up!
              </h4>
              <br />
              <Button
                color="danger"
                size="lg"
                component={Link}
                to="/register"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-play" />
                Register
              </Button>
            </GridItem>
            <GridItem xs={16} sm={16} md={8}>
              <Carousel />
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.gallaryContainer}>
          <h2>New Arrivals</h2>
          <ProductGallary />
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.gallaryContainer}>
          <h2>Books</h2>
          <ProductGallary />
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.gallaryContainer}>
          <h2>Headphones</h2>
          <ProductGallary />
        </div>
      </div>
      <Footer />
    </div>
  );
}
