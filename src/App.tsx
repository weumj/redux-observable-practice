import React from "react";
import "./App.css";

import SearchBeers from "./components/Beers";

// import Stories from "./components/Stories";
// import Users from "./components/Users";

class App extends React.Component {
    public render() {
        return (
            <div className="App">
                <SearchBeers />
            </div>
        );
    }
}

export default App;
