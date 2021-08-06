import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/root/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./redux/reducers/configureStore";
import AuthProvider from "./services/AuthContext";

const store = configureStore();

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);
