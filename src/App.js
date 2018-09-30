import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Paper,
  Typography,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "react-json-inspector/json-inspector.css";
import "./App.css";

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: "center"
  },
  button: {
    margin: "auto",
    display: "block"
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "30px"
  },
  textField: {
    marginTop: "50px"
  }
});

class App extends Component {
  state = {
    command: "",
    calender: "",
    valueOne: "",
    valueTwo: "",
    contentString: "",
    showOne: false,
    showTwo: false,
    showThree: false,
    apiData: "",
    data: {},
    jsonUrl: "",
    isFetched: false
  };

  constructor() {
    super();
    this.state = {
      command: "",
      calender: "",
      valueOne: "",
      valueTwo: "",
      contentString: "",
      showOne: false,
      showTwo: false,
      showThree: false,
      apiData: "",
      data: {},
      jsonUrl: "https://jsonplaceholder.typicode.com/posts/",
      isFetched: false
    };
  }

  handleSubmit(e) {
    if (
      this.state.valueOne == "" &&
      this.state.valueTwo == "" &&
      this.state.calender == ""
    ) {
      this.setState({
        contentString: ""
      });
    } else {
      this.setState({
        contentString:
          this.state.valueOne +
          "\n" +
          this.state.valueTwo +
          "\n" +
          this.state.calender
      });
    }
    console.log("Json url to fetch ", this.state.jsonUrl);
    fetch(this.state.jsonUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        // Work with JSON data here
        this.setState({
          data: data,
          isFetched: true
        });
      })
      .catch(err => {
        // Do something for an error here
      });
    console.log("Input values: ", this.state.contentString);
  }

  handleChange = command => event => {
    if (event.target.value == 1) {
      this.setState({
        hideAll: true,
        showOne: false,
        showTwo: false,
        showThree: false,
        showAll: false,
        [command]: event.target.value
      });
    }

    if (event.target.value == 2) {
      this.setState({
        hideAll: false,
        showOne: true,
        showTwo: false,
        showThree: false,
        showAll: false,
        [command]: event.target.value
      });
    }

    if (event.target.value == 3) {
      this.setState({
        hideAll: false,
        showOne: true,
        showTwo: true,
        showThree: true,
        showAll: true,
        [command]: event.target.value
      });
    }
  };

  handleChangeValueOne = valueOne => event => {
    console.log("value one: ", event.target.value);
    this.setState({
      [valueOne]: event.target.value
    });
  };

  handleChangeValueTwo = valueTwo => event => {
    console.log("value two: ", event.target.value);
    this.setState({
      [valueTwo]: event.target.value
    });
  };

  handleCalederValue = calender => event => {
    console.log("value date: ", event.target.value);
    this.setState({
      [calender]: event.target.value
    });
  };

  clearJsonData(e) {
    this.setState({
      data: {},
      isFetched: false
    });
  }

  render() {
    const { classes } = this.props;
    var Inspector = require("react-json-inspector");
    return (
      <div className="App">
        <Paper className={classes.paper} elevation={1}>
          <Typography variant="headline" component="h3">
            This is a React Material-Ui.
          </Typography>
          <Typography component="p">
            This app is build with material-ui & flex layout.
          </Typography>
        </Paper>

        <div className="first-div">
          <div className="fist-div-left">
            <div className="commandSelector">
              <form autoComplete="off" className={classes.form}>
                <FormControl className={classes.formControl}>
                  <InputLabel htmlFor="select-command">Command</InputLabel>
                  <Select
                    value={this.state.command}
                    onChange={this.handleChange("command")}
                    inputProps={{
                      name: "command",
                      id: "select-command"
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>COMMAND 1</MenuItem>
                    <MenuItem value={2}>COMMAND 2</MenuItem>
                    <MenuItem value={3}>COMMAND 3</MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>

            <div className="submitBtn">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                style={{ marginTop: "50px", marginRight: "60%" }}
                onClick={this.handleSubmit.bind(this)}
              >
                SUBMIT
              </Button>
            </div>
          </div>

          <div className="first-div-right">
            <div className="input-area">
              <div>
                {this.state.showOne ? (
                  <TextField
                    id="valueOne"
                    label="valueOne"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    value={this.state.valueOne}
                    onChange={this.handleChangeValueOne("valueOne")}
                    margin="normal"
                    variant="outlined"
                  />
                ) : null}
              </div>

              <div>
                {this.state.showTwo ? (
                  <TextField
                    id="valueTwo"
                    label="valueTwo"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    value={this.state.valueTwo}
                    onChange={this.handleChangeValueTwo("valueTwo")}
                    margin="normal"
                    variant="outlined"
                  />
                ) : null}
              </div>

              <div>
                {this.state.showThree ? (
                  <TextField
                    id="calender"
                    label="Birthday"
                    type="date"
                    defaultValue=""
                    onChange={this.handleCalederValue("calender")}
                    style={{ position: "relative", top: 20, left: 10 }}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                ) : null}
              </div>
            </div>

            <div className="clear-area">
              <div className="blank-space" />
              <div className="clear-button">
                <Button
                  variant="fab"
                  aria-label="Delete"
                  className={classes.button}
                  onClick={this.clearJsonData.bind(this)}
                >
                  <DeleteIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="second-div">
          <div className="json-viewer">
            <Inspector data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
