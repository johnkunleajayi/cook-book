import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import GlobalState from "./context/index.jsx";


const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <StrictMode>
      <GlobalState>
      <App />
      </GlobalState>
    </StrictMode>
  </BrowserRouter>
);


