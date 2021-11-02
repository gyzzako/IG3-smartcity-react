import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import BackOffice from "../components/backOffice/BackOffice";
import Login from "../components/login/Login";

export default function Routes(){
    return(
        <Router>
            <Switch>
            <Route path="/connexion">
                <Login/>
            </Route>

            <Route path="/administration">
                <BackOffice/>
            </Route>

            <Route path="/">
                <Login/>
            </Route>
            </Switch>
        </Router>
    );
}