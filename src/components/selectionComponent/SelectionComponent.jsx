import React, { Component } from "react";
// import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { input } from "./InputJson";
import Select from "react-select";
import { TextField } from "@material-ui/core";

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

class SelectionComponent extends Component {
    state = {
        taxOrRmi: "tax",
        location: "location",
        taxCategory: "select",
        rmi: "select",
        destination: "select",
        // urlValue: "",
        locationValue: [],
        stateValue: [],
        taxValue: [],
        rmiValue: [],
        destinationValue: []
    };

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

    //   handleSelectUrl = data => {
    //     console.log("handleSelectUrl", data);
    //     this.setState({ urlValue: data });
    //   };

    handleSelectState = data => {
        this.setState({ stateValue: data });
    };

    handleSelectLocation = data => {
        this.setState({ locationValue: data });
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

    handleSubmit = () => {
        let output = {
            isRmiDriven: this.state.taxOrRmi === "rmi",
            location: {
                all: this.state.location === "all",
                stateList: this.state.stateValue,
                idList: this.state.locationValue
            },
            taxCategory: {
                all: this.state.taxCategory === "all",
                idList: this.state.taxValue
            },
            rmi: {
                all: this.state.rmi === "all",
                idList: this.state.rmiValue
            },
            destination: {
                all: this.state.destination === "all",
                idList: this.state.destinationValue
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
            rmiValue: [],
            destinationValue: [],
            //   urlValue: "",
            taxValue: []
        });

        console.log("Output json: ", output);
    };

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
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20 }}>
                        <Select
                            placeholder={
                                this.state.location === "state"
                                    ? "State(s)"
                                    : "Location(s)"
                            }
                            onChange={
                                this.state.location === "state"
                                    ? this.handleSelectState
                                    : this.handleSelectLocation
                            }
                            value={
                                this.state.location === "all"
                                    ? []
                                    : this.state.location === "state"
                                    ? this.state.stateValue
                                    : this.state.locationValue
                            }
                            isMulti={true}
                            isSearchable={true}
                            options={
                                this.state.location === "state"
                                    ? input.state
                                    : input.location
                            }
                            isDisabled={this.state.location === "all"}
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

                    <div style={{ paddingBottom: 20 }}>
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

                    <div style={{ paddingBottom: 20 }}>
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
                                                    .length === 0)
                                        }
                                    />
                                }
                                label="Select"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>

                    <div style={{ paddingBottom: 20 }}>
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
                                    this.state.locationValue.length === 0)
                            }
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
                                    : this.state.locationValue.length === 0))
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

export default withStyles(styles)(SelectionComponent);
