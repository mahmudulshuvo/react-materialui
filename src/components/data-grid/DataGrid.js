import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import "./DataGrid.css";

class DataGrid extends Component {
    constructor(props) {
        super(props);
        console.log("constructor called");
        this.state = {
            columns: [
                { name: "userId", title: "userId" },
                { name: "id", title: "id" },
                { name: "title", title: "title" },
                { name: "body", title: "body" }
            ],
            rows: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                this.setState({
                    rows: data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { rows, columns } = this.state;
        return (
            <div className="data-grid-div">
                <Paper>
                    <Grid rows={rows} columns={columns}>
                        <PagingState defaultCurrentPage={0} pageSize={10} />
                        <IntegratedPaging />
                        <Table />
                        <TableHeaderRow />
                        <PagingPanel />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default DataGrid;
