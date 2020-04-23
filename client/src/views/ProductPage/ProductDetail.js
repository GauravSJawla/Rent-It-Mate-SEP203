// To display details of the particular product along with calendar to request for rent
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/productDetailPage.js";
import productImage from "assets/img/table-sample.jpg";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

const useStyles = makeStyles(styles);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
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

const ProductDetail = () => {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedDate, setSelectedDate] = React.useState(
    new Date(Date.now())
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  console.log("user is in product detail page");
  return (
    <div>
      <Parallax filter image={require("assets/img/electronics.jpg")}>
        <div className={classes.container}>
          <GridContainer
            className={classes.gridContainer}
            xs={12}
            sm={12}
            md={12}
          >
            <GridItem xs={4} sm={4} md={4}>
              <Card>
                <img src={productImage} alt="prpoduct" />
              </Card>
            </GridItem>
            <GridItem xs={8} sm={8} md={8}>
              <Card>
                <form className={classes.form}>
                  <CardBody>
                    <h2>Table</h2>
                    <span>
                      <strong>Price: </strong>
                    </span>
                    <span>2</span>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Start Date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                        <span> To </span>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Return Date"
                          value={selectedDate}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button type="submit" simple color="primary" size="lg">
                      Request This
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Reservations" />
            <Tab label="Specifications" />
            <Tab label="Reviews" />
          </Tabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <div className={classes.calendar}>
            <FullCalendar
              defaultView="dayGridMonth"
              plugins={[dayGridPlugin]}
              events={[
                { title: 'Out of Storage', date: '2020-04-01' },
                { title: 'Out of Storage', date: '2020-04-02' }
              ]}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          Round Table
        </TabPanel>
        <TabPanel value={value} index={2}>
          Reviews
        </TabPanel>
      </div>
    </div>
  );
};

export default ProductDetail;
