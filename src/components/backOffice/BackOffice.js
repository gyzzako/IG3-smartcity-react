import axios from "axios";
import React from "react";
import Header from "../header/Header";
import ActionBar from "./ActionBar";
import classes from './BackOffice.module.css';
import Table from "./Table";
import utils from '../../utils/utils';

class BackOffice extends React.Component{
    constructor(){
        super();
        this.state={
            chosenTable: undefined,
            isUserAuthorized: false
        }
    }


    // on gère l'autorisation au composant backoffice à la place de simplement laisser les admins se connecter au site car on pourrait permettre aux utilisateurs de 
    // réclamer ou proposer des plats depuis ce site. Ces simples utilisateurs auraient alors la possibilté d'accéder à ces composants sans leur laisser accès au backoffice.
    async componentDidMount(){
        const config = utils.getAPIHeaderWithJWTToken();
        try {
            const response = await axios.get("http://localhost:3001/v1/user/backoffice-authorization", config);
            if (response.status === 200) {
                this.setState({ isUserAuthorized: true });
            }
        } catch (e) {
        }
    }

    //key={} pour que le composant sache quand le props change pour le refresh
    render(){
        if(this.state.isUserAuthorized){
            return(
                <>
                    <Header />
                    <div className={classes.backOffice}>
                        <ActionBar chosenTableCallback={(tableName) => this.displayTable(tableName)}/>
                        <Table key={this.state.chosenTable} chosenTable={this.state.chosenTable} />
                    </div>
                </>
            );
        }else{
            return(
                <>
                    <Header />
                    <p>Vous n'avez pas la permission !</p>
                </>
            );
        }
        
    }

    displayTable(tableName){
        this.setState({chosenTable: tableName});
    }
}

export default BackOffice;