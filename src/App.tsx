import * as React from "react";
import "./App.css";

import Stories from "./components/Stories";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <Stories />
            </div>
        );
    }
}

export default App;
