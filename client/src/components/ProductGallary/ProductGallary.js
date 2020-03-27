import React, { useState } from "react";
import { Image } from "semantic-ui-react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../../assets/css/carousel.css";

import pic1 from "assets/img/headphones1.jpg";
import pic2 from "assets/img/headphones2.jpg";
import pic3 from "assets/img/headphones3.jpg";
import pic4 from "assets/img/headphones4.jpg";
import pic5 from "assets/img/headphones5.jpg";
import pic6 from "assets/img/headphones1.jpg";
import pic7 from "assets/img/headphones2.jpg";
import pic8 from "assets/img/headphones3.jpg";
import pic9 from "assets/img/headphones4.jpg";
import pic10 from "assets/img/headphones5.jpg";

export default function ProductGallary() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      paritialVisibilityGutter: 50
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      paritialVisibilityGutter: 30
    }
  };
  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10];
  return (
    <Carousel ssr={false} partialVisbile sliderClass="image-slider" itemClass="image-item" responsive={responsive}>
      {images.slice(0, 10).map(image => {
        return (
          <Image
            draggable={false}
            style={{ width: "100%", height: "100%" }}
            src={image}
          />
        );
      })}
    </Carousel>
  );
}
