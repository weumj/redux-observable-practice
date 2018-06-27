import * as React from "react";
import "./App.css";

import Users from "./components/Users";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Users />
            </div>
        );
    }
}

export default App;
