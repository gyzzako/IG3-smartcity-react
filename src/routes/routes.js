import React, {Suspense, lazy} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
const BackOffice = lazy(() => import ("../components/backOffice/BackOffice"));
const Login = lazy(() => import ("../components/login/Login"));

export default function Routes(){
    return(
        <Router>
            <Suspense fallback={<div>Chargement...</div>}>
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
            </Suspense>
        </Router>
    );
}