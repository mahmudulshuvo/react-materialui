import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import NewCom from "../new-component/NewCom";
import Body from "../body-div/Body";
import Footer from "../footer/Footer";
import TableView from "../table/TableView";
import "../../App.css";

function TabContainer(props) {
    return (
        <div>
            {props.children === "Item One" ? (
                <div className="App">
                    <Body />
                    <Footer />
                </div>
            ) : null}
            {props.children === "Item Two" ? (
                <div className="App">
                    <Body />
                    <TableView />
                </div>
            ) : null}
            {props.children === "Item Three" ? (
                <div className="App">
                    <NewCom />
                </div>
            ) : null}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper
    }
});

class Tabbar extends Component {
    state = {
        value: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Item One" />
                        <Tab label="Item Two" />
                        <Tab label="Item Three" />
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>Item One</TabContainer>}
                {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>}
            </div>
        );
    }
}

Tabbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tabbar);
