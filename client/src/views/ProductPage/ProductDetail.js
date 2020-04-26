// To display details of the particular product along with calendar to request for rent
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import styles from 'assets/jss/material-kit-react/views/productDetailPage.js';
import Spinner from './Spinner';

import { getSingleProduct } from 'actions/product';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const ProductDetail = ({
  product: { product, loading },
  match,
  getSingleProduct,
}) => {
  const classes = useStyles();

  useEffect(() => {
    getSingleProduct(match.params.id);
  }, [getSingleProduct, match.params.id]);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [startDate, setStartDate] = React.useState(new Date(Date.now()));
  const [endDate, setEndDate] = React.useState(new Date(Date.now() + 86400000));

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  let period;

  period = (endDate - startDate) / (1000 * 3600 * 24);

  console.log('user is in product detail page');

  function refreshPage() {
    let time = 1;
    if (time < 1) {
      window.location.reload();
      time++;
    } else {
    }
  }

  const loadingPage = () => {
    return (
      <div>
        <Spinner />
        {refreshPage()}
      </div>
    );
  };

  return loading ? (
    loadingPage()
  ) : (
    <div className={classes.root}>
      <div className={classes.mainRaised}>
        <GridContainer justify='center'>
          <GridItem xs={12} sm={12} md={3}>
            <Card className={classes.cardPic}>
              <img
                src={`http://localhost:5000/api/product/photo/` + product._id}
                alt='product'
                className={classes.img}
              />
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={9}>
            <Card className={classes.cardForm}>
              <form className={classes.form}>
                <CardBody>
                  <div className={classes.typo}>
                    <h1 className={classes.title}>{product.name}</h1>
                  </div>
                  <div className={classes.typo}>
                    <h3 className={classes.title}>Price: $ {product.price}</h3>
                  </div>
                  {product.shipping === true ? (
                    <div className={classes.typo}>
                      <p className={classes.title}>Shipping is available</p>
                    </div>
                  ) : (
                    <div className={classes.typo}>
                      <p className={classes.title}>Shipping is NOT available</p>
                    </div>
                  )}
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify='space-around'>
                      <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yyyy'
                        margin='normal'
                        id='date-picker-inline'
                        label='Start Date'
                        value={startDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <h4 className={classes.title}>TO</h4>
                      <KeyboardDatePicker
                        disableToolbar
                        variant='inline'
                        format='MM/dd/yyyy'
                        margin='normal'
                        id='date-picker-inline'
                        label='Return Date'
                        value={endDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  {period > 0 ? (
                    <Button type='submit' color='primary' size='lg'>
                      Request This
                    </Button>
                  ) : (
                    <Button type='submit' disabled color='primary' size='lg'>
                      Request This
                    </Button>
                  )}
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
      <div className={classes.main}>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='primary'
            textColor='primary'
            centered
          >
            <Tab label='Reservations' />
            <Tab label='Specifications' />
            {/*<Tab label="Reviews" />*/}
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <div className={classes.calendar}>
            <FullCalendar
              defaultView='dayGridMonth'
              plugins={[dayGridPlugin]}
              header={[{ left: 'title', center: '', right: 'prev,next' }]}
              events={[
                {
                  title: 'Available',
                  start: product.fromDate,
                  end: product.toDate,
                },
              ]}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {product.description}
        </TabPanel>
        <TabPanel value={value} index={2}>
          Reviews
        </TabPanel>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.object.isRequired,
  getSingleProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(
  mapStateToProps,
  {
    getSingleProduct,
  }
)(ProductDetail);
