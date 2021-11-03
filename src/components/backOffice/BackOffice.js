import React from "react";
import Header from "../header/Header";
import ActionBar from "./ActionBar";
import classes from './BackOffice.module.css';
import Table from "./Table";

class BackOffice extends React.Component{
    constructor(){
        super();
        this.state={
            chosenTable: undefined
        }
    }

    //TODO: formulaire des modals + delete row

    //key={} pour que le composant sache quand le props change pour le refresh
    render(){
        return(
            <>
                <Header />
                <div className={classes.backOffice}>
                    <ActionBar chosenTableCallback={(tableName) => this.displayTable(tableName)}/>
                    <Table key={this.state.chosenTable} chosenTable={this.state.chosenTable} />
                </div>
            </>
        );
    }

    displayTable(tableName){
        this.setState({chosenTable: tableName});
    }
}

export default BackOffice;