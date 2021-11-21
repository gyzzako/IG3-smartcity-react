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
                <Switch>
                <Route path="/connexion">
                    <Header/>
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Login/>
                    </Suspense>
                </Route>

                <Route path="/administration">
                    <Header/>
                    <Suspense fallback={<div>Chargement...</div>}>
                    <BackOffice/>
                    </Suspense>
                </Route>

                <Route path="/">
                    <Header/>
                    <Suspense fallback={<div>Chargement...</div>}>
                        <Login/>
                    </Suspense>
                </Route>
                </Switch>
        </Router>
    );
}