import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import createStore from "./store";

const store = createStore();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
