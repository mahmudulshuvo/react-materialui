import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import SimpleTooltips from "./SimpleTooltips";
import PositionedTooltips from "./PositionedTooltips";
import ControlledTooltips from "./ControledTootips";
import TriggerTooltips from "./TriggersTooltips";
import TransitionsTooltips from "./TransitionTooltips";
import DelayTooltips from "./DelayTooltips";
import DisabledTooltips from "./DisabledTooltips";
import CustomizedTooltips from "./CustomizedTooltips";
import VariableWidth from "./VariableWidth";
import "./Tooltips.css";
class Tooltips extends Component {
    render() {
        return (
            <div className="tooltip-div">
                <Paper style={{ background: "#eee" }}>
                    <h2>Simple Tooltip</h2>
                    <span>
                        <p>Just a regular tooltip to show content</p>
                    </span>
                    <SimpleTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Positioned Tooltips</h2>
                    <span>
                        <p>
                            The Tooltip has 12 placements choice. They don’t
                            have directional arrows; instead, they rely on
                            motion emanating from the source to convey
                            direction.
                        </p>
                    </span>
                    <PositionedTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Controlled Tooltips</h2>
                    <span>
                        <p>
                            You can use the open, onOpen and onClose properties
                            to control the behavior of the tooltip.
                        </p>
                    </span>
                    <ControlledTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Triggers</h2>
                    <span>
                        <p>
                            You can define the types of events that cause a
                            tooltip to show.
                        </p>
                    </span>
                    <TriggerTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Transitions</h2>
                    <span>
                        <p>Use a different transition.</p>
                    </span>
                    <TransitionsTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Showing and hiding</h2>
                    <span>
                        <p>
                            The tooltip is normally shown immediately when the
                            user's mouse hovers over the element, and hides
                            immediately when the user's mouse leaves. A delay in
                            showing or hiding the tooltip can be added through
                            the properties enterDelay and leaveDelay, as shown
                            in the Controlled Tooltips demo above. On mobile,
                            the tooltip is displayed when the user longpresses
                            the element and hides after a delay of 1500ms. You
                            can disable this feature with the
                            disableTouchListener property.
                        </p>
                    </span>
                    <DelayTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Disabled Elements</h2>
                    <span>
                        <p>
                            By default disabled elements like Button do not
                            trigger user interactions so a Tooltip will not
                            activate on normal events like hover. To accomodate
                            disabled elements, add a simple wrapper element like
                            a span.
                        </p>
                    </span>
                    <DisabledTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Customized</h2>
                    <span>
                        <p>This tooltips are customized.</p>
                    </span>
                    <CustomizedTooltips />
                </Paper>

                <Paper style={{ background: "#eee" }}>
                    <h2>Variable Width</h2>
                    <span>
                        <p>
                            The Tooltip wraps long text by default to make it
                            readable.
                        </p>
                    </span>
                    <VariableWidth />
                </Paper>
            </div>
        );
    }
}

export default Tooltips;
