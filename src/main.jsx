// ──────────────────────────────────────────────────────
//  main.jsx — Application entry point
//  Wraps <App /> in Redux <Provider> and React Router
// ──────────────────────────────────────────────────────

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Redux store available to the entire app */}
    <Provider store={store}>
      {/* BrowserRouter enables React Router DOM */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
