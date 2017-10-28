import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import thunk from "redux-thunk";

import reducer from "./reducer";
import App from "./App";

ReactDOM.render((
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById("root"));