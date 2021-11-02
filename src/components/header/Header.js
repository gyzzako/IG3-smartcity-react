import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

//TODO : dans le header tu peux rajouter le logo comme dans le dossier ,mais si tu peux en trouver en format png ca sera mieux.
//perso le design du mockup du dossier je le trouve trop simpliste et j'ai demandé au prof par mail si ca lui pose problème que l'on modifie notre design
//parce qu'il avait dit qu'il s'en fiche de la partie design. On verra sa réponse.

const Header =() =>{
    return(
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink activeClassName={classes.active} to="/connexion">Connexion</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;