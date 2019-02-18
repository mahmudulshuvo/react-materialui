import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Dropdown, Grid } from "semantic-ui-react";
import { input } from "./InputJson";

const styles = theme => ({
    root: {
        display: "flex",
        marginTop: 3 * theme.spacing.unit,
        marginLeft: 3 * theme.spacing.unit
    },
    formControl: {
        margin: theme.spacing.unit * 3
    },
    group: {
        margin: `${theme.spacing.unit}px 0`
    },
    button: {
        margin: theme.spacing.unit
    },
    paper: {
        paddingTop: 3.5 * theme.spacing.unit
    }
});

class SelectionComponent extends Component {
    state = {
        taxOrRmi: "tax",
        location: "location",
        taxCategory: "select",
        rmi: "select",
        destination: "select",
        urlValue: "",
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

    handleSelectUrl = (event, data) => {
        this.setState({ urlValue: data.value });
    };

    handleSelectState = (event, data) => {
        this.setState({ stateValue: data.value });
    };

    handleSelectLocation = (event, data) => {
        this.setState({ locationValue: data.value });
    };

    handleSelectTax = (event, data) => {
        this.setState({ taxValue: data.value });
    };

    handleSelectRmi = (event, data) => {
        this.setState({ rmiValue: data.value });
    };

    handleSelectDestination = (event, data) => {
        this.setState({ destinationValue: data.value });
    };

    handleSubmit = () => {
        let output = {
            isRmiDriven: this.state.taxOrRmi === "rmi",
            url: this.state.urlValue,
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
            urlValue: "",
            taxValue: []
        });

        console.log("Output json: ", output);
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid>
                    <Grid.Column width={16}>
                        <FormControl>
                            <RadioGroup
                                aria-label="position"
                                name="position"
                                value={this.state.taxOrRmi}
                                onChange={this.handleChangeTaxOrRmi}
                                style={{ marginLeft: "25px" }}
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
                        </FormControl>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                        >
                            <FormLabel component="legend">URL:</FormLabel>
                        </FormControl>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Dropdown
                            placeholder="Url"
                            fluid
                            search
                            selection
                            options={input.url}
                            value={this.state.urlValue}
                            onChange={this.handleSelectUrl}
                            style={{
                                width: "400px",
                                marginTop: "10px",
                                marginLeft: "-200px"
                            }}
                        />
                    </Grid.Column>
                    <Grid.Column width={16}>
                        {/* //Locations */}
                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                        >
                            <FormLabel component="legend">Locations:</FormLabel>
                            <RadioGroup
                                name="locations"
                                className={classes.group}
                                value={this.state.location}
                                onChange={this.handleChangeLocation}
                            >
                                <FormControlLabel
                                    value="all"
                                    control={
                                        <Radio
                                            disabled={
                                                this.state.taxOrRmi === "rmi"
                                            }
                                        />
                                    }
                                    label="All"
                                />
                                <FormControlLabel
                                    value="state"
                                    control={<Radio />}
                                    label="By states"
                                />
                                <FormControlLabel
                                    value="location"
                                    control={<Radio />}
                                    label="By location"
                                />
                            </RadioGroup>
                        </FormControl>

                        <FormControl
                            component="fieldset"
                            className={classes.formControl}
                        >
                            <FormLabel component="legend" />
                            <Dropdown
                                placeholder="State"
                                fluid
                                multiple
                                search
                                selection
                                options={input.state}
                                value={this.state.stateValue}
                                disabled={
                                    this.state.location === "all" ||
                                    this.state.location === "location"
                                }
                                onChange={this.handleSelectState}
                                style={{
                                    width: "400px",
                                    marginTop: "70px"
                                }}
                            />
                            <Dropdown
                                placeholder="Locations"
                                fluid
                                multiple
                                search
                                selection
                                options={input.location}
                                value={this.state.locationValue}
                                disabled={
                                    this.state.location === "all" ||
                                    this.state.location === "state"
                                }
                                onChange={this.handleSelectLocation}
                                style={{
                                    width: "400px",
                                    marginTop: "20px"
                                }}
                            />
                        </FormControl>
                    </Grid.Column>

                    {/* //Tax Category */}
                    <Grid.Column width={16}>
                        <div>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Tax Category:
                                </FormLabel>
                                <RadioGroup
                                    name="taxCategory"
                                    className={classes.group}
                                    value={this.state.taxCategory}
                                    onChange={this.handleChangeTaxCategory}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={
                                            <Radio
                                                disabled={
                                                    this.state.taxOrRmi ===
                                                    "rmi"
                                                }
                                            />
                                        }
                                        label="All"
                                    />
                                    <FormControlLabel
                                        value="select"
                                        control={
                                            <Radio
                                                disabled={
                                                    this.state.taxOrRmi ===
                                                    "rmi"
                                                }
                                            />
                                        }
                                        label="Select"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend" />
                                <Dropdown
                                    placeholder="Tax Category"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={input.taxCategory}
                                    value={this.state.taxValue}
                                    disabled={
                                        this.state.taxCategory === "all" ||
                                        this.state.taxOrRmi === "rmi"
                                    }
                                    onChange={this.handleSelectTax}
                                    style={{
                                        width: "400px",
                                        marginTop: "70px",
                                        marginLeft: "25px"
                                    }}
                                />
                            </FormControl>
                        </div>
                    </Grid.Column>

                    {/* //RMI */}
                    <Grid.Column width={16}>
                        <div>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">RMI:</FormLabel>
                                <RadioGroup
                                    name="rmi"
                                    className={classes.group}
                                    value={this.state.rmi}
                                    onChange={this.handleChangeRMI}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={
                                            <Radio
                                                disabled={
                                                    this.state.taxOrRmi ===
                                                    "tax"
                                                }
                                            />
                                        }
                                        label="All"
                                    />
                                    <FormControlLabel
                                        value="select"
                                        control={
                                            <Radio
                                                disabled={
                                                    this.state.taxOrRmi ===
                                                    "tax"
                                                }
                                            />
                                        }
                                        label="Select"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend" />
                                <Dropdown
                                    placeholder="RMI"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={input.rmi}
                                    value={this.state.rmiValue}
                                    disabled={
                                        this.state.rmi === "all" ||
                                        this.state.taxOrRmi === "tax"
                                    }
                                    onChange={this.handleSelectRmi}
                                    style={{
                                        width: "400px",
                                        marginTop: "70px",
                                        marginLeft: "25px"
                                    }}
                                />
                            </FormControl>
                        </div>
                    </Grid.Column>

                    {/* //Destination */}
                    <Grid.Column width={16}>
                        <div>
                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend">
                                    Destinations:
                                </FormLabel>
                                <RadioGroup
                                    name="destination"
                                    className={classes.group}
                                    value={this.state.destination}
                                    onChange={this.handleChangeDestination}
                                >
                                    <FormControlLabel
                                        value="all"
                                        control={
                                            <Radio
                                                disabled={
                                                    (this.state.taxOrRmi ===
                                                    "tax"
                                                        ? this.state
                                                              .taxCategory ===
                                                          "all"
                                                            ? false
                                                            : this.state
                                                                  .taxValue
                                                                  .length === 0
                                                        : this.state.rmi ===
                                                          "all"
                                                        ? false
                                                        : this.state.rmiValue
                                                              .length === 0) ||
                                                    (this.state.location !==
                                                        "all" &&
                                                        this.state.stateValue
                                                            .length === 0 &&
                                                        this.state.locationValue
                                                            .length === 0)
                                                }
                                            />
                                        }
                                        label="All"
                                    />
                                    <FormControlLabel
                                        value="select"
                                        control={
                                            <Radio
                                                disabled={
                                                    (this.state.taxOrRmi ===
                                                    "tax"
                                                        ? this.state
                                                              .taxCategory ===
                                                          "all"
                                                            ? false
                                                            : this.state
                                                                  .taxValue
                                                                  .length === 0
                                                        : this.state.rmi ===
                                                          "all"
                                                        ? false
                                                        : this.state.rmiValue
                                                              .length === 0) ||
                                                    (this.state.location !==
                                                        "all" &&
                                                        this.state.stateValue
                                                            .length === 0 &&
                                                        this.state.locationValue
                                                            .length === 0)
                                                }
                                            />
                                        }
                                        label="Select"
                                    />
                                </RadioGroup>
                            </FormControl>

                            <FormControl
                                component="fieldset"
                                className={classes.formControl}
                            >
                                <FormLabel component="legend" />
                                <Dropdown
                                    placeholder="Destination"
                                    fluid
                                    multiple
                                    search
                                    selection
                                    options={input.destination}
                                    value={this.state.destinationValue}
                                    disabled={
                                        this.state.destination === "all" ||
                                        (this.state.taxOrRmi === "tax"
                                            ? this.state.taxCategory === "all"
                                                ? false
                                                : this.state.taxValue.length ===
                                                  0
                                            : this.state.rmi === "all"
                                            ? false
                                            : this.state.rmiValue.length ===
                                              0) ||
                                        (this.state.location !== "all" &&
                                            this.state.stateValue.length ===
                                                0 &&
                                            this.state.locationValue.length ===
                                                0)
                                    }
                                    onChange={this.handleSelectDestination}
                                    style={{
                                        width: "400px",
                                        marginTop: "70px",
                                        marginLeft: "25px"
                                    }}
                                />
                            </FormControl>
                        </div>
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
                                        : this.state.locationValue.length ===
                                          0)) ||
                                this.state.urlValue.length === 0
                            }
                            onClick={this.handleSubmit}
                            style={{ marginLeft: "25px" }}
                        >
                            Submit
                        </Button>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

SelectionComponent.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectionComponent);
