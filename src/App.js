import React, { Component } from "react";
import Appbar from "./components/itemOne/app-bar/Appbar";
import Tabbar from "./components/tabs/Tabs";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Appbar />
                <Tabbar />
            </div>
        );
    }
}

export default App;
