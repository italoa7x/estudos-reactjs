import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CounterContextProvider } from "./context/CounterContext";
import "./index.css";

import { TitleColorContextProvider } from "./context/TitleColorContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TitleColorContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </TitleColorContextProvider>
  </React.StrictMode>
);
