import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import actionCable from "actioncable";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const CableApp = {};
CableApp.cable = actionCable.createConsumer("ws://localhost:3000/cable");
export const ActionCableContext = createContext();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ActionCableContext.Provider value={CableApp.cable}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ActionCableContext.Provider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
