import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "./BodyTwo.css";

class BodyTwo extends Component {
  render() {
    return (
      <div className="body-div-two">
        <div style={{ flexGrow: 2 }}>
          <TextField
            id="valueOne"
            label="valueOne"
            multiline
            rowsMax="4"
            //value={this.state.valueOne}
            //onChange={this.handleChangeValueOne("valueOne")}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div style={{ flexGrow: 2 }}>
          <TextField
            id="valueTwo"
            label="valueTwo"
            multiline
            rowsMax="4"
            //value={this.state.valueTwo}
            // style={{ marginLeft: "30%" }}
            // onChange={this.handleChangeValueTwo("valueTwo")}
            margin="normal"
            variant="outlined"
          />
        </div>

        <div style={{ flexGrow: 2 }}>
          <TextField
            id="calender"
            label="Birthday"
            type="date"
            defaultValue=""
            // onChange={this.handleCalenderValue("calender")}
            style={{
              position: "relative",
              top: 20
              //   left: 10
              //   marginLeft: "30%"
            }}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
      </div>
    );
  }
}

export default BodyTwo;
