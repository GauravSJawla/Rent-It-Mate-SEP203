import { container, title } from "assets/jss/material-kit-react.js";

const adminDashboardStyle = {
  container: {
    ...container,
    marginTop: "20px",
    zIndex: "2",
    position: "relative",
    color: "#FFFFFF",
    minWidth: "40vh"
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  form: {
    margin: "0",
  },
  cardHeader: {
    width: "auto",
    textAlign: "center",
    marginLeft: "20px",
    marginRight: "20px",
    marginTop: "-40px",
    padding: "20px 0",
    marginBottom: "15px",
  },
  socialIcons: {
    maxWidth: "24px",
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
  },
  divider: {
    marginTop: "30px",
    marginBottom: "0px",
    textAlign: "center",
  },
  cardFooter: {
    paddingTop: "0rem",
    border: "0",
    borderRadius: "6px",
    justifyContent: "center !important",
  },
  socialLine: {
    marginTop: "1rem",
    textAlign: "center",
    padding: "0",
  },
  inputIconsColor: {
    color: "#495057",
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
  dashboardTitle: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "black",
    textDecoration: "none",
  },
  carouselTitle: {
    ...title,
    marginTop: "30px",
    marginLeft: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  table: {
    minWidth: 400,
    borderWidth: "0 px",
    backgroundColor: "white",
    align: "left",
  },
  td: {
    fontWeight: "500",
    color: "black",
    padding: "0 20px",
    borderColor: "black",
    fontSize: "normal",
  },
  th: {
    fontWeight: "700",
    padding: "0 20px",
    borderColor: "black",
    fontSize: "bold",
  },
  dashboardSubtitle: {
    color: "black",
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
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
    padding: "1px 30px 0px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  }
};

export default adminDashboardStyle;
