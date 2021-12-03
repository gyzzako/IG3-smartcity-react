import React, {Suspense, lazy} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Header from '../components/header/Header';
const BackOffice = lazy(() => import ("../components/backOffice/BackOffice"));
const Login = lazy(() => import ("../components/login/Login"));


export default function Routes(){
    return(
        <Router>
            <Header/>
            <Switch>
                <Route exact path="/connexion">
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Login />
                    </Suspense>
                </Route>

                <Route exact path="/administration">
                    <Suspense fallback={<div>Chargement...</div>}>
                        <BackOffice />
                    </Suspense>
                </Route>

                <Route exact path="/">
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Login />
                    </Suspense>
                </Route>
            </Switch>
        </Router>
    );
}