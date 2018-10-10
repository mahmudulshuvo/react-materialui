import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./DataGrid.css";

function Loading() {
    return (
        <div className="loading-shading-mui">
            <CircularProgress className="loading-icon-mui" />
        </div>
    );
}

export default Loading;
