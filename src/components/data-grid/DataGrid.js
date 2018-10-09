import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { PagingState, CustomPaging } from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

import Loading from "./CircularIndeterminate";

const URL = "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems";

export default class DataGrid extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "OrderNumber", title: "Order Number" },
                { name: "OrderDate", title: "Order Date" },
                { name: "StoreCity", title: "Store City" },
                { name: "StoreState", title: "Store State" },
                { name: "Employee", title: "Employee" },
                { name: "SaleAmount", title: "Sale Amount" }
            ],
            rows: [],
            totalCount: 0,
            pageSize: 6,
            currentPage: 0,
            loading: true,
            isFirst: false
        };

        this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    changeCurrentPage(currentPage) {
        this.setState({
            loading: true,
            isFirst: true,
            currentPage
        });
    }

    queryString() {
        const { pageSize, currentPage } = this.state;

        return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
    }

    loadData() {
        const queryString = this.queryString();
        if (queryString === this.lastQuery) {
            this.setState({
                loading: false,
                isFirst: false
            });
            return;
        }

        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                console.log(data.items);
                console.log(data.totalCount);
                this.setState({
                    rows: data.items,
                    totalCount: data.totalCount,
                    loading: false
                });
            })
            .catch(() => this.setState({ loading: false }));
        this.lastQuery = queryString;
    }

    render() {
        const {
            rows,
            columns,
            pageSize,
            currentPage,
            totalCount,
            loading,
            isFirst
        } = this.state;

        return (
            <div className="data-grid-div">
                <div>
                    <Paper>
                        <Grid rows={rows} columns={columns}>
                            <PagingState
                                currentPage={currentPage}
                                onCurrentPageChange={this.changeCurrentPage}
                                pageSize={pageSize}
                            />
                            <CustomPaging totalCount={totalCount} />
                            <Table />
                            <TableHeaderRow />
                            <PagingPanel />
                        </Grid>
                        {/* {loading && <Loading  />} */}
                    </Paper>
                </div>

                <div
                    style={{
                        position: "fixed",
                        marginLeft: "48%",
                        marginRight: "48%",
                        marginTop: "-15%",
                        zIndex: "1000"
                    }}
                >
                    {loading && isFirst && <Loading />}
                </div>
            </div>
        );
    }
}
