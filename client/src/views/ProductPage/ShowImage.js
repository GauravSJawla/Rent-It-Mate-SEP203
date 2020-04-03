import React from "react";
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import { makeStyles } from "@material-ui/core/styles";
const styles = {
    ...imagesStyles,
    cardTitle,
  };

const ShowImage =  ({productId}) => {
    console.log(productId+ ' show image')
const useStyles = makeStyles(styles);
const classes = useStyles();
    return(
    <div className="product-img">
        <img
            className={classes.imgCardTop}
            src={`http://localhost:5000/api/product/photo/`+productId}
            alt="Card-img-cap"
            style={{height: "180px", width: "100%", display: "block"}}
        />
    </div>
    )
    
};

export default ShowImage;