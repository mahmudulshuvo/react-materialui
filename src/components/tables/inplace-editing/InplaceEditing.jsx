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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const getRowId = row => row.id;
const URL = "https://jsonplaceholder.typicode.com/posts";
let defaultColumnValues = {};
let placedDate = new Date();
let dateValue = "2018-11-23";
let dateChangeFlag = false;

const styles = theme => ({
  lookupEditCell: {
    paddingTop: theme.spacing.unit * 0.875,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit
  },
  dialog: {
    width: "calc(100% - 16px)"
  },
  inputRoot: {
    width: "100%"
  }
});

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  edit: EditButton,
  commit: CommitButton,
  cancel: CancelButton
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} />;
};

export function generateRows({
  columnValues = defaultColumnValues,
  length,
  random = randomSeed(329972281)
}) {
  const data = [];
  const columns = Object.keys(columnValues);
  //console.log("columns", columns);

  for (let i = 0; i < length; i += 1) {
    const record = {};

    columns.forEach(column => {
      let values = columnValues[column];
      //console.log("values", values);
      if (typeof values === "function") {
        record[column] = values({ random, index: i, record });
        //console.log("In function");
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

const availableValues = {
  product: ["Audi", "BMW", "Toyota", "Hundai", "Nissan"]
};

const LookupEditCellBase = ({
  availableColumnValues,
  value,
  onValueChange,
  classes
}) => (
  <TableCell className={classes.lookupEditCell}>
    <Select
      value={value}
      onChange={event => onValueChange(event.target.value)}
      input={<Input classes={{ root: classes.inputRoot }} />}
    >
      {availableColumnValues.map(item => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  </TableCell>
);
export const LookupEditCell = withStyles(styles, {
  name: "ControlledModeDemo"
})(LookupEditCellBase);

const EditCell = props => {
  const { column } = props;
  const availableColumnValues = availableValues[column.name];
  if (availableColumnValues) {
    return (
      <LookupEditCell
        {...props}
        availableColumnValues={availableColumnValues}
      />
    );
  }
  if (column.name === "date") {
    return (
      <TableCell>
        <DatePicker selected={placedDate} onChange={handleChange} />
      </TableCell>
    );
  }

  return <TableEditRow.Cell {...props} />;
};

function handleChange(date) {
  // console.log("function called", date);
  placedDate = date;
  console.log("date value ", placedDate);
  dateValue = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  console.log("date year", dateValue);
  dateChangeFlag = true;
}
class InplaceEditing extends React.PureComponent {
  //This is almost clean with a minor issue
  constructor(props) {
    super(props);

    this.state = {
      columns: [],
      rows: generateRows({
        columnValues: {
          id: ({ index }) => index,
          ...defaultColumnValues
        }
      }),
      date: dateValue
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSelect = this.handleSelect.bind(this);
    console.log("defaultColumnValues", defaultColumnValues);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(date) {
    console.log("handle change called", date);
    // this.setState({
    //   date: date
    // });
    // console.log("Date property", this.state.date);
  }

  handleSelect(date) {
    console.log("handle select called", date);
    // this.setState({
    //   date: date
    // });
    // console.log("Date property", this.state.date);
  }

  commitChanges = ({ changed }) => {
    let { rows } = this.state;
    if (dateChangeFlag) {
      rows = rows.map(row => {
        if (row.id === parseInt(Object.keys(changed)[0], 10)) {
          row.date = dateValue;
        }
        return row;
      });
      dateChangeFlag = false;
    }

    if (changed) {
      rows = rows.map(row =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    this.setState({ rows });
  };

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
              defaultColumnValues["product"] = [];
              defaultColumnValues["date"] = [];
              columnArray.push(obj);
            }
            let newObj = { name: "product", title: "product" };
            columnArray.push(newObj);
            let dateObj = { name: "date", title: "date" };
            columnArray.push(dateObj);

            for (var i = 0; i < data.length; i++) {
              //console.log(
              for (var j = 0; j < columnArray.length; j++) {
                if (columnArray[j].title === "product") {
                  defaultColumnValues["product"].push("Audi");
                } else if (columnArray[j].title === "date") {
                  defaultColumnValues["date"].push(this.state.date);
                } else {
                  defaultColumnValues[columnArray[j].title].push(
                    data[i][columnArray[j].title]
                  );
                }
              }
            }
          }
          // console.log("default columns", defaultColumnValues);
          this.setState({
            columns: columnArray,
            rows: generateRows({
              columnValues: {
                id: ({ index }) => index,
                ...defaultColumnValues
              },
              length: data.length
            })
          });
        } else {
          console.log("It's not a json array");
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
            <TableEditRow cellComponent={EditCell} />
            <TableEditColumn showEditCommand commandComponent={Command} />
            <PagingPanel />
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default InplaceEditing;
