import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./components/context/AuthProvider";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { AuthContextProvider } from "./service/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </AuthContextProvider>
  </BrowserRouter>
);
