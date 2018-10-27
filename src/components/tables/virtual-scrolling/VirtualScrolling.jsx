import * as React from "react";
import Paper from "@material-ui/core/Paper";
import {
    SortingState,
    SelectionState,
    FilteringState,
    GroupingState,
    SearchState,
    IntegratedFiltering,
    IntegratedGrouping,
    IntegratedSorting,
    IntegratedSelection
} from "@devexpress/dx-react-grid";
import {
    Grid,
    VirtualTable,
    TableHeaderRow,
    TableFilterRow,
    TableSelection,
    TableGroupRow,
    GroupingPanel,
    DragDropProvider,
    TableColumnReordering,
    Toolbar,
    SearchPanel
} from "@devexpress/dx-react-grid-material-ui";

import { ProgressBarCell } from "../../utils/theme-sources/material-ui/components/progress-bar-cell";
import { HighlightedCell } from "../../utils/theme-sources/material-ui/components/highlighted-cell";
import { CurrencyTypeProvider } from "../../utils/theme-sources/material-ui/components/currency-type-provider";
import { PercentTypeProvider } from "../../utils/theme-sources/material-ui/components/percent-type-provider";
import { BooleanTypeProvider } from "../../utils/theme-sources/material-ui/components/boolean-type-provider";
import {
    generateRows,
    globalSalesValues
} from "../../utils/demo-data/generator";

const Cell = props => {
    const { column } = props;
    if (column.name === "discount") {
        return <ProgressBarCell {...props} />;
    }
    if (column.name === "amount") {
        return <HighlightedCell {...props} />;
    }
    return <VirtualTable.Cell {...props} />;
};

const getRowId = row => row.id;

export default class Demo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { name: "product", title: "Product" },
                { name: "region", title: "Region" },
                { name: "sector", title: "Sector" },
                { name: "channel", title: "Channel" },
                { name: "amount", title: "Sale Amount" },
                { name: "discount", title: "Discount" },
                { name: "saleDate", title: "Sale Date" },
                { name: "customer", title: "Customer" },
                { name: "units", title: "Units" },
                { name: "shipped", title: "Shipped" }
            ],
            tableColumnExtensions: [
                { columnName: "amount", align: "right" },
                { columnName: "units", align: "right" }
            ],
            rows: generateRows({
                columnValues: {
                    id: ({ index }) => index,
                    ...globalSalesValues
                },
                length: 200000
            }),
            currencyColumns: ["amount"],
            percentColumns: ["discount"],
            booleanColumns: ["shipped"]
        };
    }

    render() {
        const {
            rows,
            columns,
            tableColumnExtensions,
            currencyColumns,
            percentColumns,
            booleanColumns
        } = this.state;

        return (
            <div className="data-grid-div">
                <Paper>
                    <Grid rows={rows} columns={columns} getRowId={getRowId}>
                        <DragDropProvider />

                        <FilteringState
                            defaultFilters={[
                                { columnName: "saleDate", value: "2016-02" }
                            ]}
                        />
                        <SearchState />
                        <SortingState
                            defaultSorting={[
                                { columnName: "product", direction: "asc" },
                                { columnName: "saleDate", direction: "asc" }
                            ]}
                        />
                        <GroupingState
                            defaultGrouping={[{ columnName: "product" }]}
                            defaultExpandedGroups={["EnviroCare Max"]}
                        />
                        <SelectionState />

                        <IntegratedFiltering />
                        <IntegratedSorting />
                        <IntegratedGrouping />
                        <IntegratedSelection />

                        <CurrencyTypeProvider for={currencyColumns} />
                        <PercentTypeProvider for={percentColumns} />
                        <BooleanTypeProvider for={booleanColumns} />

                        <VirtualTable
                            columnExtensions={tableColumnExtensions}
                            cellComponent={Cell}
                        />
                        <TableHeaderRow showSortingControls />
                        <TableColumnReordering
                            defaultOrder={columns.map(column => column.name)}
                        />
                        <TableFilterRow showFilterSelector />
                        <TableSelection showSelectAll />
                        <TableGroupRow />
                        <Toolbar />
                        <SearchPanel />
                        <GroupingPanel showSortingControls />
                    </Grid>
                </Paper>
            </div>
        );
    }
}
