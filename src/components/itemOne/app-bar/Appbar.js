import React, { Component } from "react";
import { Paper, Typography } from "@material-ui/core";

class Appbar extends Component {
    render() {
        return (
            <div>
                <Paper
                    elevation={1}
                    style={{ textAlign: "center", padding: "20px" }}
                >
                    <Typography variant="headline" component="h3">
                        This is a React Material-Ui.
                    </Typography>
                    <Typography component="p">
                        This app is build with material-ui & flex layout.
                    </Typography>
                </Paper>
            </div>
        );
    }
}

export default Appbar;
