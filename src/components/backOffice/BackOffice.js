import React from "react";
import ActionBar from "./ActionBar";
import classes from './BackOffice.module.css';
import Table from "./Table";
import {getAPIHeaderWithJWTToken, getErrorMessageWithAPI, userHasToRelog} from '../../utils/utils';
import { Redirect } from "react-router-dom";
import {isUserAuthorizedForBackOfficeToAPI} from '../../API/index';

class BackOffice extends React.Component{
    constructor(){
        super();
        this.state={
            chosenTable: undefined,
            isUserAuthorized: false,
            errorMessage: "Vous n'avez pas la permission !",
            redirectToLogin: false
        }
    }


    // on gère l'autorisation au composant backoffice à la place de simplement laisser les admins se connecter au site car on pourrait permettre aux utilisateurs de 
    // réclamer ou proposer des plats depuis ce site. Ces simples utilisateurs auraient alors la possibilté d'accéder à ces composants sans leur laisser accès au backoffice.
    async componentDidMount(){
        const config = getAPIHeaderWithJWTToken();
        try {
            const response = await isUserAuthorizedForBackOfficeToAPI(config);
            if (response.status === 200) {
                this.setState({ isUserAuthorized: true });
            }
        } catch (e) {
            const errorMessage = getErrorMessageWithAPI(e.response);
            console.error(errorMessage)
            if(userHasToRelog()){
                this.setState({redirectToLogin: true});
            }
        }
    }

    //key={} pour que le composant sache quand le props change pour le refresh
    render(){
        if(this.state.redirectToLogin) return <Redirect to="/connexion"/>

        if(this.state.isUserAuthorized){
            return(
                <>
                    
                    <div className={classes.backOffice}>
                        <ActionBar chosenTableCallback={(tableName) => this.displayTable(tableName)}/>
                        <Table key={this.state.chosenTable} chosenTable={this.state.chosenTable} />
                    </div>
                </>
            );
        }else{
            return(
                <>
                    
                    <p>{this.state.errorMessage}</p>
                </>
            );
        }
        
    }

    displayTable(tableName){
        this.setState({chosenTable: tableName});
    }
}

export default BackOffice;