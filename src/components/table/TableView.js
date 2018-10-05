import React, { Component } from "react";
import "../../../node_modules/ts-react-json-table/build/ts-react-json-table.css";
import "./TableView.css";

class TableView extends Component {
    render() {
        const JsonTable = require("ts-react-json-table");
        var items = [
            {
                id: 75950,
                name: "Louella Wallace",
                age: 24,
                phone: "+44 (0)203 437 7302",
                color: "green"
            },
            {
                id: 80616,
                name: "Hanson Perry",
                age: 36,
                phone: "+44 (0)203 279 3708",
                color: "brown"
            },
            {
                id: 77621,
                name: "Brandi Long",
                age: 20,
                phone: "+44 (0)203 319 4880",
                color: "gray"
            },
            {
                id: 81299,
                name: "Tonia Sykes",
                age: 38,
                phone: "+44 (0)208 328 3671",
                color: "blue"
            },
            {
                id: 14225,
                name: "Leach Durham",
                age: 23,
                phone: "+44 (0)208 280 9572",
                color: "green"
            },
            {
                id: 75950,
                name: "Louella Wallace",
                age: 24,
                phone: "+44 (0)203 437 7302",
                color: "green"
            },
            {
                id: 80616,
                name: "Hanson Perry",
                age: 36,
                phone: "+44 (0)203 279 3708",
                color: "brown"
            }
        ];

        var columns = [
            "id",
            "name",
            { key: "age", label: "Age" },
            { key: "phone", label: "Phone" },
            {
                key: "color",
                label: "Colourful",
                cell: function(row, columnKey) {
                    return (
                        <span style={{ color: row.color }}>{row.color}</span>
                    );
                }
            }
        ];
        return (
            <div className="table-div">
                <JsonTable className="table" rows={items} columns={columns} />
            </div>
        );
    }
}

export default TableView;
