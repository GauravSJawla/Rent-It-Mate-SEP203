import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/Furniture.jpg";
import image2 from "assets/img/electronics.jpg";
import image3 from "assets/img/tvshow.jpg";

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image" />
                  {/* <div className="slick-caption">
                    <h4>first product description</h4>
                  </div> */}
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  {/* <div className="slick-caption">
                    <h4>second product description</h4>
                  </div> */}
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  {/* <div className="slick-caption">
                    <h4>third product description</h4>
                  </div> */}
                </div>
              </Carousel>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
