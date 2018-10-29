import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
    EditingState,
    PagingState,
    IntegratedPaging
} from "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditRow,
    TableEditColumn,
    PagingPanel
} from "@devexpress/dx-react-grid-material-ui";
import randomSeed from "../../utils/demo-data/random";

const getRowId = row => row.id;
const URL = "https://jsonplaceholder.typicode.com/posts";
let defaultColumnValues = {};

export function generateRows({
    columnValues = defaultColumnValues,
    length,
    random = randomSeed(329972281)
}) {
    const data = [];
    const columns = Object.keys(columnValues);

    for (let i = 0; i < length; i += 1) {
        const record = {};

        columns.forEach(column => {
            let values = columnValues[column];
            if (typeof values === "function") {
                record[column] = values({ random, index: i, record });
                console.log("In function");
                return;
            }

            while (values.length === 2 && typeof values[1] === "object") {
                values = values[1][record[values[0]]];
            }

            const value = values[Math.floor(random() * values.length)];
            if (typeof value === "object") {
                record[column] = Object.assign({}, value);
            } else {
                record[column] = value;
            }
        });

        data.push(record);
    }
    return data;
}

class CustomPagination extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
            rows: generateRows({
                columnValues: {
                    id: ({ index }) => index,
                    ...defaultColumnValues
                }
            })
        };

        this.commitChanges = this.commitChanges.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    commitChanges({ deleted }) {
        let { rows } = this.state;
        if (deleted) {
            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.id));
        }
        this.setState({ rows });
    }

    fetchData() {
        let columnArray = [];
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data instanceof Array) {
                    if (data.length > 0) {
                        var obj = data[0];

                        for (var key in obj) {
                            let obj = { name: key, title: key };
                            defaultColumnValues[key] = [];
                            columnArray.push(obj);
                        }

                        for (var i = 0; i < data.length; i++) {
                            //console.log(
                            for (var j = 0; j < columnArray.length; j++) {
                                defaultColumnValues[columnArray[j].title].push(
                                    data[i][columnArray[j].title]
                                );
                            }
                        }
                    }
                    this.setState({
                        columns: columnArray,
                        rows: generateRows({
                            columnValues: {
                                id: ({ id }) => id,
                                ...defaultColumnValues
                            },
                            length: data.length
                        })
                    });
                } else {
                    console.log("Its not a json array");
                }
            })
            .catch(() => console.log("Error in fetching"));
    }

    render() {
        const { rows, columns } = this.state;

        return (
            <div className="data-grid-div">
                <Paper>
                    <Grid rows={rows} columns={columns} getRowId={getRowId}>
                        <PagingState defaultCurrentPage={0} pageSize={5} />
                        <IntegratedPaging />
                        <EditingState onCommitChanges={this.commitChanges} />
                        <Table />
                        <TableHeaderRow />
                        <TableEditRow />
                        <TableEditColumn showDeleteCommand />
                        <PagingPanel />
                    </Grid>
                </Paper>
            </div>
        );
    }
}

export default CustomPagination;
