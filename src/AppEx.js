import React, { Component } from "react";
import {
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

class AppEx extends Component {
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
      this.state.valueOne === "" &&
      this.state.valueTwo === "" &&
      this.state.calender === ""
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
    if (event.target.value === 1) {
      this.setState({
        showOne: false,
        showTwo: false,
        showThree: false,
        showAll: false,
        [command]: event.target.value
      });
    }

    if (event.target.value === 2) {
      this.setState({
        showOne: true,
        showTwo: false,
        showThree: false,
        showAll: false,
        [command]: event.target.value
      });
    }

    if (event.target.value === 3) {
      this.setState({
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

  handleCalenderValue = calender => event => {
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
    var Inspector = require("react-json-inspector");
    return (
      <div className="App">
        <Paper elevation={1} style={{ textAlign: "center", padding: "20px" }}>
          <Typography variant="headline" component="h3">
            This is a React Material-Ui.
          </Typography>
          <Typography component="p">
            This app is build with material-ui & flex layout.
          </Typography>
        </Paper>

        <div className="body-div">
          <div className="body-div-one">
            <div style={{ flexGrow: 1 }}>
              <form autoComplete="off" style={{ marginTop: "30px" }}>
                <FormControl style={{ minWidth: 120 }}>
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

            <div>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "50px" }}
                onClick={this.handleSubmit.bind(this)}
              >
                SUBMIT
              </Button>
            </div>
          </div>

          <div className="body-div-two">
            <div>
              {this.state.showOne ? (
                <TextField
                  id="valueOne"
                  label="valueOne"
                  multiline
                  rowsMax="4"
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
                  value={this.state.valueTwo}
                  style={{ marginLeft: "30%" }}
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
                  onChange={this.handleCalenderValue("calender")}
                  style={{
                    position: "relative",
                    top: 20,
                    left: 10,
                    marginLeft: "30%"
                  }}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>

        <div className="footer-div">
          <div style={{ flexGrow: 1 }}>
            <Button
              variant="fab"
              aria-label="Delete"
              onClick={this.clearJsonData.bind(this)}
            >
              <DeleteIcon />
            </Button>
          </div>
          <div style={{ flexGrow: 11 }}>
            <Inspector data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default AppEx;
