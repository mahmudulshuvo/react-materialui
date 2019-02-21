import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { input } from "./NewInputJson";
import Select from "react-select";
import { TextField } from "@material-ui/core";
import makeAnimated from "react-select/lib/animated";

const styles = theme => ({
    root: {
        display: "flex"
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    },
    button: {
        margin: theme.spacing.unit
    }
});

class SelectionComponentNew extends Component {
    state = {
        taxOrRmi: "tax",
        location: "location",
        taxCategory: "select",
        rmi: "select",
        destination: "select",
        locationValue: [],
        stateValue: [],
        marketValue: [],
        taxValue: [],
        rmiValue: [],
        destinationValue: [],
        uniqueStates: [],
        loading: false
    };

    componentDidMount() {
        let uniqueArr = this.getUnique(input.state, "text");
        for (let i = 0; i < uniqueArr.length; i++) {
            uniqueArr[i].key = i;
        }
        this.setState({
            uniqueStates: uniqueArr
        });
    }

    handleChangeTaxOrRmi = event => {
        this.setState({ taxOrRmi: event.target.value });
    };

    handleChangeLocation = event => {
        this.setState({ location: event.target.value });
    };

    handleChangeTaxCategory = event => {
        this.setState({ taxCategory: event.target.value });
    };

    handleChangeRMI = event => {
        this.setState({ rmi: event.target.value });
    };

    handleChangeDestination = event => {
        this.setState({ destination: event.target.value });
    };

    handleSelectState = data => {
        this.setState({ stateValue: data });
    };

    handleSelectLocation = data => {
        this.setState({ locationValue: data });
    };

    handleSelectMarket = data => {
        this.setState({ marketValue: data });
    };

    handleSelectTax = data => {
        this.setState({ taxValue: data });
    };

    handleSelectRmi = data => {
        this.setState({ rmiValue: data });
    };

    handleSelectDestination = data => {
        this.setState({ destinationValue: data });
    };

    handleSearchChangeLocation = (event, { searchQuery }) => {
        if (searchQuery === null) {
            this.setState({ loading: false });
        } else {
            this.setState({ loading: true });
            setTimeout(() => {
                this.setState({ loading: false });
            }, 200);
        }
    };

    handleSubmit = () => {
        let locationIdList = [];
        let states = [];
        let marketIdList = [];
        let taxCategoryIdList = [];
        let rmiIdList = [];
        let destionIdList = [];

        for (let i = 0; i < this.state.stateValue.length; i++) {
            states.push(this.state.stateValue[i].value);
        }

        for (let i = 0; i < this.state.locationValue.length; i++) {
            locationIdList.push(this.state.locationValue[i].value);
        }

        for (let i = 0; i < this.state.marketValue.length; i++) {
            marketIdList.push(this.state.marketValue[i].value);
        }

        for (let i = 0; i < this.state.taxValue.length; i++) {
            taxCategoryIdList.push(this.state.taxValue[i].value);
        }

        for (let i = 0; i < this.state.rmiValue.length; i++) {
            rmiIdList.push(this.state.rmiValue[i].value);
        }

        for (let i = 0; i < this.state.destinationValue.length; i++) {
            destionIdList.push(this.state.destinationValue[i].value);
        }

        let output = {
            isRmiDriven: this.state.taxOrRmi === "rmi",
            location: {
                all: this.state.location === "all",
                stateList: states,
                marketList: marketIdList,
                idList: locationIdList
            },
            taxCategory: {
                all: this.state.taxCategory === "all",
                idList: taxCategoryIdList
            },
            rmi: {
                all: this.state.rmi === "all",
                idList: rmiIdList
            },
            destination: {
                all: this.state.destination === "all",
                idList: destionIdList
            }
        };

        this.setState({
            taxOrRmi: "tax",
            location: "location",
            taxCategory: "select",
            rmi: "select",
            destination: "select",
            locationValue: [],
            stateValue: [],
            marketValue: [],
            rmiValue: [],
            destinationValue: [],
            taxValue: []
        });

        console.log("Output json: ", output);
    };

    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)
            .filter(e => arr[e])
            .map(e => arr[e]);
        return unique;
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{ flexGrow: 1, width: "100%", padding: "50px" }}>
                <div
                    onKeyDown={this.onKeyDown}
                    style={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "row",
                        width: "100%",
                        paddingBottom: 20
                    }}
                >
                    <div style={{ marginTop: -20 }}>
                        {
                            <TextField
                                id="tf1"
                                label={"Template name"}
                                multiline={false}
                                fullWidth={true}
                                value={this.state.tf1}
                                onChange={this.handleValue}
                                margin="normal"
                                variant="outlined"
                            />
                        }
                    </div>

                    <div style={{ paddingLeft: 30 }}>
                        {/*isRmiDriven? + URL*/}
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.taxOrRmi}
                            onChange={this.handleChangeTaxOrRmi}
                            row
                        >
                            <FormControlLabel
                                value="tax"
                                control={<Radio />}
                                label="Tax Category"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="rmi"
                                control={<Radio />}
                                label="RMI driven"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>
                </div>

                <div>
                    {/* Location */}
                    <div>
                        <FormLabel component="label">Location:</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.location}
                            onChange={this.handleChangeLocation}
                            row
                        >
                            <FormControlLabel
                                value="all"
                                control={<Radio />}
                                label="All"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="state"
                                control={<Radio />}
                                label="By State"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="location"
                                control={<Radio />}
                                label="By Location"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="market"
                                control={<Radio />}
                                label="By Market"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20, width: "40%" }}>
                        <Select
                            placeholder={
                                this.state.location === "all"
                                    ? "Location(s)"
                                    : this.state.location === "state"
                                    ? "State(s)"
                                    : this.state.location === "location"
                                    ? "Location(s)"
                                    : "Market(s)"
                            }
                            onChange={
                                this.state.location === "state"
                                    ? this.handleSelectState
                                    : this.state.location === "location"
                                    ? this.handleSelectLocation
                                    : this.handleSelectMarket
                            }
                            value={
                                this.state.location === "all"
                                    ? []
                                    : this.state.location === "state"
                                    ? this.state.stateValue
                                    : this.state.location === "location"
                                    ? this.state.locationValue
                                    : this.state.marketValue
                            }
                            isMulti={true}
                            isSearchable={true}
                            options={
                                this.state.location === "state"
                                    ? input.state
                                    : this.state.location === "location"
                                    ? input.location
                                    : input.market
                            }
                            isDisabled={this.state.location === "all"}
                            components={makeAnimated()}
                            getOptionLabel={opt => opt.value}
                        />
                    </div>
                </div>

                {/* Tax Category */}
                <div>
                    <div>
                        <FormLabel component="label">Tax Category:</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.taxCategory}
                            onChange={this.handleChangeTaxCategory}
                            row
                        >
                            <FormControlLabel
                                value="all"
                                control={
                                    <Radio
                                        disabled={this.state.taxOrRmi === "rmi"}
                                    />
                                }
                                label="All"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="select"
                                control={
                                    <Radio
                                        disabled={this.state.taxOrRmi === "rmi"}
                                    />
                                }
                                label="Select"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20, width: "40%" }}>
                        <Select
                            placeholder="Tax Category(s)"
                            onChange={this.handleSelectTax}
                            value={this.state.taxValue}
                            isMulti={true}
                            isSearchable={true}
                            options={input.taxCategory}
                            isDisabled={
                                this.state.taxCategory === "all" ||
                                this.state.taxOrRmi === "rmi"
                            }
                            components={makeAnimated()}
                            getOptionLabel={opt => opt.value}
                        />
                    </div>
                </div>

                {/* Rmi Category */}
                <div>
                    <div>
                        <FormLabel component="label">Rmi Category:</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.rmi}
                            onChange={this.handleChangeRMI}
                            row
                        >
                            <FormControlLabel
                                value="all"
                                control={
                                    <Radio
                                        disabled={this.state.taxOrRmi === "tax"}
                                    />
                                }
                                label="All"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="select"
                                control={
                                    <Radio
                                        disabled={this.state.taxOrRmi === "tax"}
                                    />
                                }
                                label="Select"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20, width: "40%" }}>
                        <Select
                            placeholder="RMI(s)"
                            onChange={this.handleSelectRmi}
                            value={this.state.rmiValue}
                            isMulti={true}
                            isSearchable={true}
                            options={input.rmi}
                            isDisabled={
                                this.state.rmi === "all" ||
                                this.state.taxOrRmi === "tax"
                            }
                            components={makeAnimated()}
                            getOptionLabel={opt => opt.value}
                        />
                    </div>
                </div>

                {/* Destination */}
                <div>
                    <div>
                        <FormLabel component="label">Destination:</FormLabel>
                        <RadioGroup
                            aria-label="position"
                            name="position"
                            value={this.state.destination}
                            onChange={this.handleChangeDestination}
                            row
                        >
                            <FormControlLabel
                                value="all"
                                control={
                                    <Radio
                                        disabled={
                                            (this.state.taxOrRmi === "tax"
                                                ? this.state.taxCategory ===
                                                  "all"
                                                    ? false
                                                    : this.state.taxValue
                                                          .length === 0
                                                : this.state.rmi === "all"
                                                ? false
                                                : this.state.rmiValue.length ===
                                                  0) ||
                                            (this.state.location !== "all" &&
                                                this.state.stateValue.length ===
                                                    0 &&
                                                this.state.locationValue
                                                    .length === 0 &&
                                                this.state.marketValue
                                                    .length === 0)
                                        }
                                    />
                                }
                                label="All"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="select"
                                control={
                                    <Radio
                                        disabled={
                                            (this.state.taxOrRmi === "tax"
                                                ? this.state.taxCategory ===
                                                  "all"
                                                    ? false
                                                    : this.state.taxValue
                                                          .length === 0
                                                : this.state.rmi === "all"
                                                ? false
                                                : this.state.rmiValue.length ===
                                                  0) ||
                                            (this.state.location !== "all" &&
                                                this.state.stateValue.length ===
                                                    0 &&
                                                this.state.locationValue
                                                    .length === 0 &&
                                                this.state.marketValue
                                                    .length === 0)
                                        }
                                    />
                                }
                                label="Select"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20, width: "40%" }}>
                        <Select
                            placeholder="Destination(s)"
                            onChange={this.handleSelectDestination}
                            value={this.state.destinationValue}
                            isMulti={true}
                            isSearchable={true}
                            options={input.destination}
                            isDisabled={
                                this.state.destination === "all" ||
                                (this.state.taxOrRmi === "tax"
                                    ? this.state.taxCategory === "all"
                                        ? false
                                        : this.state.taxValue.length === 0
                                    : this.state.rmi === "all"
                                    ? false
                                    : this.state.rmiValue.length === 0) ||
                                (this.state.location !== "all" &&
                                    this.state.stateValue.length === 0 &&
                                    this.state.locationValue.length === 0 &&
                                    this.state.marketValue.length === 0)
                            }
                            components={makeAnimated()}
                            getOptionLabel={opt => opt.value}
                        />
                    </div>
                </div>
                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={
                            (this.state.taxOrRmi === "tax"
                                ? this.state.taxCategory === "all"
                                    ? false
                                    : this.state.taxValue.length === 0
                                : this.state.rmi === "all"
                                ? false
                                : this.state.rmiValue.length === 0) ||
                            (this.state.destination !== "all" &&
                                this.state.destinationValue.length === 0) ||
                            (this.state.location !== "all" &&
                                (this.state.location === "state"
                                    ? this.state.stateValue.length === 0
                                    : this.state.location === "location"
                                    ? this.state.locationValue.length === 0
                                    : this.state.marketValue.length === 0))
                        }
                        onClick={this.handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(SelectionComponentNew);
