import { container, title } from "assets/jss/material-kit-react.js";

const productDetailPage = {
  root: {
    flexGrow: 1,
  },
  title: {
    ...title,
    marginTop: "30px",
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
    zIndex: "4",
    color: "#FFFFFF",
    background: "#FFFFFF",
    display: "block",
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    right: "0",
    left: "0",
    position: "relative",
    borderRadius: "6px",
    boxShadow:
      "0 4px 6px 0.5px rgba(0, 0, 0, 0.14), 0 2px 5px 1px rgba(0, 0, 0, 0.12), 0 2px 2.5px -1px rgba(0, 0, 0, 0.2)",
  },
  cardPic: {
    height: "50vh",
    justifyContent: "center",
  },
  cardForm: {
    height: "50vh",
  },
  typo: {
    marginBottom: "40px",
    position: "relative",
    width: "100%",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  calendar: {
    margin: "0 auto",
    maxWidth: "900px",
  },
  img: {
    objectFit: "contain",
  },
};

export default productDetailPage;
