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
import DataGrid from "../data-grid/DataGrid";
import Tooltips from "../tooltips/Tooltips";
import DataEditing from "../data-grid/DataEditing";
import VirtualScrolling from "../data-grid/VirtualScrolling.jsx";
import ChartIntegration from "../data-grid/ChartIntegration";
import TreeData from "../data-grid/TreeData";
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
      {/* {props.children === "Item Two" ? (
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
      {props.children === "Item Four" ? (
        <div className="App">
          <DataGrid />
        </div>
      ) : null} */}
      {props.children === "Pagination" ? (
        <div className="App">
          <DataGrid />
        </div>
      ) : null}
      {props.children === "Data Editing" ? (
        <div className="App">
          <DataEditing />
        </div>
      ) : null}
      {props.children === "Virtual Scrolling" ? (
        <div className="App">
          <VirtualScrolling />
        </div>
      ) : null}

      {props.children === "Chart Integration" ? (
        <div className="App">
          <ChartIntegration />
        </div>
      ) : null}

      {props.children === "Tree Data" ? (
        <div className="App">
          <TreeData />
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
            {/* <Tab label="Item Two" />
            <Tab label="Item Three" />
            <Tab label="Item Four" /> */}
            <Tab label="Pagination" />
            <Tab label="Data Editing" />
            <Tab label="Virtual Scrolling" />
            <Tab label="Chart Integration" />
            <Tab label="Tree Data" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {/* {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        {value === 3 && <TabContainer>Item Four</TabContainer>} */}
        {value === 1 && <TabContainer>Pagination</TabContainer>}
        {value === 2 && <TabContainer>Data Editing</TabContainer>}
        {value === 3 && <TabContainer>Virtual Scrolling</TabContainer>}
        {value === 4 && <TabContainer>Chart Integration</TabContainer>}
        {value === 5 && <TabContainer>Tree Data</TabContainer>}
      </div>
    );
  }
}

Tabbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tabbar);
