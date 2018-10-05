import React, { Component } from "react";
import BodyOne from "../body-div-one/BodyOne";
import BodyTwo from "../body-div-two/BodyTwo";
import "./Body.css";

class Body extends Component {
    render() {
        return (
            <div className="body-div">
                <BodyOne />
                <BodyTwo />
            </div>
        );
    }
}

export default Body;
