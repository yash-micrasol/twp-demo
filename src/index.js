import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorkerRegistration.register();

reportWebVitals();
