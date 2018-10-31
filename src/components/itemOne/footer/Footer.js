import React, { Component } from "react";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import "react-json-inspector/json-inspector.css";
import "./Footer.css";
import { any } from "prop-types";

const jsonURL = "https://jsonplaceholder.typicode.com/users";
class Footer extends Component {
    state = {
        jsonData: any
    };

    componentDidMount() {
        this.fetchJson();
    }

    fetchJson() {
        fetch(jsonURL)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    jsonData: data
                });
            })
            .catch(() => console.log("Error in fetching"));
    }

    deleteData = () => {
        this.setState({
            jsonData: null
        });
    };

    saveData = () => {
        let prettyJsondata = JSON.stringify(this.state.jsonData, null, 2);
        this.download(prettyJsondata, "json.txt", "text/plain");
    };

    download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }

    expand = () => {
        return true;
    };

    render() {
        var Inspector = require("react-json-inspector");
        return (
            <div className="footer-div">
                <div style={{ flexGrow: 1 }}>
                    <Button
                        variant="fab"
                        aria-label="Delete"
                        style={{ marginBottom: "10px" }}
                        onClick={this.deleteData}
                    >
                        <DeleteIcon />
                    </Button>
                    <Button
                        variant="fab"
                        aria-label="Save"
                        style={{ marginLeft: "20px", marginBottom: "10px" }}
                        onClick={this.saveData}
                    >
                        <SaveIcon />
                    </Button>
                </div>
                <div style={{ flexGrow: 11 }}>
                    <Inspector
                        data={this.state.jsonData}
                        isExpanded={this.expand}
                    />
                </div>
            </div>
        );
    }
}

export default Footer;
