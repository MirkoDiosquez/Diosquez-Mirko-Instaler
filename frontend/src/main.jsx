import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Notifications from "./components/Notifications";
import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Notifications>
      <App />
    </Notifications>
  </React.StrictMode>,
);
