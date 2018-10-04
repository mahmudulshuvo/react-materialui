import React, { Component } from "react";
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import "./BodyOne.css";

class BodyOne extends Component {
  render() {
    return (
      <div className="body-div-one">
        <div style={{ flexGrow: 2 }}>
          <form autoComplete="off" style={{ marginTop: "30px" }}>
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel htmlFor="select-command">Command</InputLabel>
              <Select
                // value={this.state.command}
                // onChange={this.handleChange("command")}
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

        <div style={{ flexGrow: 2 }}>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "50px" }}
            // onClick={this.handleSubmit.bind(this)}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    );
  }
}

export default BodyOne;
