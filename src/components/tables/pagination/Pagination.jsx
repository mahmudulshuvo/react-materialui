import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { PagingState, CustomPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel
} from "@devexpress/dx-react-grid-material-ui";

import Loading from "./Loader.js";

const URL = "https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems";

class DataGrid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      rows: [],
      totalCount: 0,
      pageSize: 6,
      currentPage: 0,
      loading: true
    };

    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  componentDidMount() {
    this.setColumns();
    this.loadData();
  }

  componentDidUpdate() {
    this.loadData();
  }

  changeCurrentPage(currentPage) {
    this.setState({
      loading: true,
      currentPage
    });
  }

  setColumns() {
    const queryString = this.queryString();
    let columnArray = [];
    fetch(queryString)
      .then(response => response.json())
      .then(data => {
        if (data.items.length > 0) {
          var obj = data.items[0];

          for (var key in obj) {
            let obj = { name: key, title: key };
            columnArray.push(obj);
          }
        }
        this.setState({
          columns: columnArray
        });
      })
      .catch(() => console.log("Fetch error"));
  }

  queryString() {
    const { pageSize, currentPage } = this.state;

    return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
  }

  loadData() {
    const queryString = this.queryString();
    if (queryString === this.lastQuery) {
      this.setState({
        loading: false
      });
      return;
    }

    fetch(queryString)
      .then(response => response.json())
      .then(data => {
        console.log(data.items);
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
      loading
    } = this.state;

    return (
      <div className="data-grid-div">
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
          {loading && <Loading />}
        </Paper>
      </div>
    );
  }
}

export default DataGrid;
