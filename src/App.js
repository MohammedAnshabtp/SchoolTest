import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import MainRouter from "./components/routing/router/MainRouter";
import Store from "./components/context/store";
import withClearCache from "./ClearCache";

function App() {
    return <ClearCacheComponent />;
}

const MainApp = () => (
    <Store>
        <Router>
            <MainRouter />
        </Router>
    </Store>
);

const ClearCacheComponent = withClearCache(MainApp);

export default App;
