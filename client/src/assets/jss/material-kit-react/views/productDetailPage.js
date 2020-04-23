import { container, title } from "assets/jss/material-kit-react.js";

const productDetailPage = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    background: "#FFFFFF",
    ...container,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#000000",
    textDecoration: "none",
  },
  carouselTitle: {
    ...title,
    marginTop: "30px",
    marginLeft: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    color: "black",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  calendar: {
    margin: "0 auto",
    maxWidth: "900px",
  },
};

export default productDetailPage;
