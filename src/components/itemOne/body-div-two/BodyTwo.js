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
                        style={{
                            position: "relative",
                            top: 20
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
