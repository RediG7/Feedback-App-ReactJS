// entry point to react
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// main app component, where do we wanna our main app component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
