import { container, title } from 'assets/jss/material-kit-react.js';

const conatinerFluid = {
  paddingRight: '10px',
  paddingLeft: '10px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%'
};

const landingContainer = {
  ...conatinerFluid,
  '@media (min-width: 576px)': {
    maxWidth: '606px'
  },
  '@media (min-width: 768px)': {
    maxWidth: '808px'
  },
  '@media (min-width: 992px)': {
    maxWidth: '1044px'
  },
  '@media (min-width: 1200px)': {
    maxWidth: '1264px'
  }
};

const landingPageStyle = {
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    ...container
  },
  landingContainer: {
    zIndex: '12',
    color: '#FFFFFF',
    ...landingContainer
  },
  gallaryContainer: {
    zIndex: '12'
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  dashboardTitle: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: 'black',
    textDecoration: 'none'
  },
  carouselTitle: {
    ...title,
    marginTop: '30px',
    marginLeft: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  table:{
    minWidth: 400,
    borderWidth: '0 px',
    backgroundColor: 'white',
    align:'left'
  },
  td: {
    fontWeight: '500',
    color: 'black',
    padding: '0 20px',
    borderColor:'black',
    fontSize:'normal'
  },
th:{
    fontWeight: '700',
    padding: '0 20px',
    borderColor:'black',
    fontSize:'bold'
  },

  dashboardSubtitle: {
    color: 'black',
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0'
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0'
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    padding: '1px 30px 0px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  }
};

export default landingPageStyle;
