import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Body from "../itemOne/body-div/Body";
import Footer from "../itemOne/footer/Footer";
import Pagination from "../tables/pagination/Pagination.jsx";
import DataEditing from "../tables/data-editing/DataEditing.jsx";
import TreeData from "../tables/tree-data/TreeData.jsx";
import ChartIntegration from "../tables/chart-integration/ChartIntegration.jsx";
import VirtualScrolling from "../tables/virtual-scrolling/VirtualScrolling.jsx";
import CustomPagination from "../tables/custom-pagination/CustomPagination.jsx";
import InplaceEditing from "../tables/inplace-editing/InplaceEditing.jsx";
import DragDropFile from "../drapDrop/DrapDropFile";
import TestComponent from "../tables/test-component/TestComponent.jsx";
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
      {props.children === "Pagination" ? (
        <div className="App">
          <Pagination />
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

      {props.children === "Custom Pagination" ? (
        <div className="App">
          <CustomPagination />
        </div>
      ) : null}

      {props.children === "Inplace Edit" ? (
        <div className="App">
          <InplaceEditing />
        </div>
      ) : null}

      {props.children === "Drag Drop File" ? (
        <div className="App">
          <DragDropFile />
        </div>
      ) : null}

      {props.children === "Test" ? (
        <div className="App">
          <TestComponent />
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
            <Tab label="Pagination" />
            <Tab label="Data Editing" />
            <Tab label="Virtual Scrolling" />
            <Tab label="Chart Integration" />
            <Tab label="Tree Data" />
            <Tab label="Custom Pagination" />
            <Tab label="Inplace Edit" />
            <Tab label="Drag Drop File" />
            <Tab label="Test" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Pagination</TabContainer>}
        {value === 2 && <TabContainer>Data Editing</TabContainer>}
        {value === 3 && <TabContainer>Virtual Scrolling</TabContainer>}
        {value === 4 && <TabContainer>Chart Integration</TabContainer>}
        {value === 5 && <TabContainer>Tree Data</TabContainer>}
        {value === 6 && <TabContainer>Custom Pagination</TabContainer>}
        {value === 7 && <TabContainer>Inplace Edit</TabContainer>}
        {value === 8 && <TabContainer>Drag Drop File</TabContainer>}
        {value === 9 && <TabContainer>Test</TabContainer>}
      </div>
    );
  }
}

Tabbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tabbar);
