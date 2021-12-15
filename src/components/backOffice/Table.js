import React from "react";
import classes from './BackOffice.module.css';
import TableModal from "./TableModal";
import objectFormatterForAPI from '../../utils/objectFormatterForAPI';
import {getAPIHeaderWithJWTToken, getErrorMessageWithAPI, isOldAndNewRowEqual} from '../../utils/utils';
import {getTableDataFromApi, updateTableRowToAPI, deleteTableRowToAPI,
        postTableRowToAPI, getTableCountFromApi} from '../../API/index';
import PropTypes from 'prop-types';
import {isJwtValid} from '../../utils/utils';
import { Redirect } from "react-router-dom";
import {tableBodyMapper as mealTableBodyMapper} from './tableContent/meal';
import {tableBodyMapper as userTableBodyMapper} from './tableContent/user';
import {tableBodyMapper as orderTableBodyMapper} from './tableContent/order';
import {tableBodyMapper as categoryTableBodyMapper} from './tableContent/category';

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chosenTable: props.chosenTable,
            tableRows: undefined,
            showModal: false,
            showTable: false,
            redirectToLogin: false,
            rowPerTable: 5,
            clickedTablePageNumber: 1,
            pageNumberTotal: 1
        }
        this.totalRowsCount = undefined;
        this.rowObjectToModify = undefined;

        //nom de colonnes perso pour chaque colonne dans les tables
        this.userTableColumnsName = [{id: "Id"}, {firstname: "Prénom"}, {lastname: "Nom"}, {phone_number: "Téléphone"}, {username: "Pseudo"}, {isadmin: "Administrateur"}, {province: "Province"}, {city:"Ville"}, {street_and_number:"Rue et numéro"}];
        this.mealTableColumnsName = [{id: "Id"}, {name: "Nom"}, {description: "Description"}, {portion_number: "Nombre de portion"}, {publication_date: "Date de publication"}, {user_fk: "Id de l'utilisateur"}, {category_fk: "Categorie"}, {order_fk: "Id de la commande"}, {image:"Image du plat"}]; 
        this.orderTableColumnsName = [{id: "Id"}, {order_date: "Date de la commande"}, {user_fk: "Id de l'utilisateur"}]
        this.categoryTableColumnsName = [{id: "Id"}, {name: "Nom"}]

        this.tableBodyMapper = undefined;

        this.researchedRow = undefined;
        this.timeout = undefined;
    }

    closeModal(){
        this.rowObjectToModify = undefined;
        this.setState({showModal: false});
    } 

    showModal(rowObject){
        this.rowObjectToModify = rowObject;
        this.setState({showModal: true});
    }
    
    async componentDidMount(){
        if(this.state.chosenTable !== undefined){
            await this.loadTableData();
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if(this.state.chosenTable !== undefined && (this.state.rowPerTable !== prevState.rowPerTable || this.state.clickedTablePageNumber !== prevState.clickedTablePageNumber)){
            await this.loadTableData(this.researchedRow);
        }
    }

    async loadTableData(research){ //quand research n'est pas undefined c'est qu'on veut récupérer les lignes qui contiennent l'élément de recherche
        try {
            const config = getAPIHeaderWithJWTToken();

            const response = await getTableCountFromApi(this.state.chosenTable, config, research);
            this.totalRowsCount = response.data;
            this.setState({pageNumberTotal: Math.ceil(this.totalRowsCount/this.state.rowPerTable)})

            //                                       table choisie     |    header | ligne par table        |           offset
            const { data } = await getTableDataFromApi(this.state.chosenTable, config, this.state.rowPerTable, (this.state.clickedTablePageNumber - 1) * this.state.rowPerTable, research);
            const rowsData = data;
            if (rowsData !== undefined) {
                this.setState({ tableRows: rowsData, showTable: true });
            }
        } catch (e) {
            const errorMessage = getErrorMessageWithAPI(e.response);
            alert(errorMessage);
            console.error(e);
            if (!isJwtValid()) {
                this.setState({ redirectToLogin: true });
            }
        }
    }

    render(){
        if(this.state.redirectToLogin) return <Redirect to="/connexion"/>

        let table;
        switch(this.state.chosenTable){
            case "meal":
                table = this.createTable(this.mealTableColumnsName);
                this.tableBodyMapper = mealTableBodyMapper;
                break;
            case "user":
                table = this.createTable(this.userTableColumnsName);
                this.tableBodyMapper = userTableBodyMapper;
                break;
            case "order":
                table = this.createTable(this.orderTableColumnsName);
            
                this.tableBodyMapper = orderTableBodyMapper;
                break;
            case "category":
                table = this.createTable(this.categoryTableColumnsName);
                this.tableBodyMapper = categoryTableBodyMapper;
                break;
            default:
                table = undefined;
        }

        let liElem = [];
        for (let i = 1; i <= this.state.pageNumberTotal; i++) {
            liElem.push(
            <li key={i} style={{cursor: "pointer"}} className={i === this.state.clickedTablePageNumber ? "page-item active" : null} onClick={() => {this.setState({ clickedTablePageNumber: i })}}>
               <span className="page-link">{i}</span>
            </li>
            ) 
        }
        
        return(
            <div className={classes.tableData}>
                <div>
                    <input onChange={(e) => {this.searchInTable(e.target.value)}} style={{float: "left", height: 40}} placeholder="Rechercher" type="text"/>
                    <label style={{marginRight: 5}} id="totalRowsSelectorLabel">LIMIT:</label>
                    <select onChange={(e) => this.setState({rowPerTable: parseInt(e.target.value), clickedTablePageNumber: 1})} defaultValue={this.state.rowPerTable} name="totalRowsSelector" id="totalRowsSelector">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="50">50</option>
                    </select>
                    <button onClick={() => this.showModal()} style={{backgroundColor : "#38015c", color: "white", float: "right"}} className="btn mb-3">AJOUTER</button>
                </div>
                <div className={classes.table}>
                    {this.state.showTable && table}
                </div>
                {this.state.showTable && this.state.showModal && <TableModal rowObjectToModify={this.rowObjectToModify} closeModalCallback={() => this.closeModal()} 
                    saveModificationsCallback={(newRowObject) => { this.saveModificationsModal(newRowObject) }} 
                    addNewRowCallback={(newRowObject) => { this.addNewRow(newRowObject) }} key={this.state.chosenTable} chosenTable={this.state.chosenTable}/>
                }
                <nav>
                    <ul className="pagination pagination-sm">
                        {this.state.showTable && liElem.map(elem => {return elem})}
                    </ul>
                </nav>
            </div>
        );
    }

    async searchInTable(research){
        //créé un timer et supprime l'ancien à la saisie d'une touche. Si plus de touche après 750 ms, alors on exécute la requête
        if (this.state.showTable && research !== "") {
            if (this.timeout) clearTimeout(this.timeout);
            this.timeout = setTimeout(async () => {
                this.state.clickedTablePageNumber = 1; //pas setState car pas besoin de refresh le composent
                this.researchedRow = research;
                this.loadTableData(research);
            }, 750);
        }else if(research === ""){
            if(this.timeout) clearTimeout(this.timeout);
            this.researchedRow = undefined;
            await this.loadTableData();
        }
    }

    createTable(columnsNameObject){
        if(this.state.tableRows !== undefined){
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Action</th>
                            {columnsNameObject.map((columnNameObject, index) => {
                                return (
                                    <th key={index}>{Object.values(columnNameObject)[0]}</th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableRows.map((rowObject, index) => {
                            return (
                                <tr className={classes.tableRow} key={index}>
                                    <td>
                                        <button className="btn far fa-edit" onClick={() => { //modify button
                                            this.showModal(rowObject);
                                        }}></button>
                                        <button className="btn far fa-trash-alt" onClick={() => this.deleteRow(rowObject.id)}></button>
                                    </td>
                                    {this.tableBodyMapper(rowObject)}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>);
        }
    }

    async saveModificationsModal(modifiedObject){
        if(this.rowObjectToModify !== undefined && !isOldAndNewRowEqual(this.rowObjectToModify,modifiedObject)){
            try{
                const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, modifiedObject);

                const config = getAPIHeaderWithJWTToken(this.state.chosenTable);
                const patchResponse = await updateTableRowToAPI(this.state.chosenTable, rowForAPI, config);
                if(patchResponse?.status === 204){
                    this.loadTableData();
                }else{
                    alert("Les modifications n'ont pas pu être enregistrées. Réessayez !");
                }
                this.closeModal();
            }catch(e){
                const errorMessage = getErrorMessageWithAPI(e.response);
                alert(errorMessage);
                console.error(e);
                if(!isJwtValid()){
                    this.setState({redirectToLogin: true});
                }
            }
        }else{
            this.closeModal();
        }
    }
    
    async deleteRow(id){
        const idForAPI = {
            id: id
        }
        try{
            const config = getAPIHeaderWithJWTToken();
            const response = await deleteTableRowToAPI(this.state.chosenTable, idForAPI, config);
            if(response?.status === 204){
                this.loadTableData();
            }else{
                alert("La suppresion n'a pas pu être réalisée. Réessayez !")
            }
        }catch(e){
            const errorMessage = getErrorMessageWithAPI(e.response);
            alert(errorMessage);
            console.error(e);
            if(!isJwtValid()){
                this.setState({redirectToLogin: true});
            }
        }
    }

    async addNewRow(newRowObject){
        try{
            const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, newRowObject);

            const config = getAPIHeaderWithJWTToken(this.state.chosenTable);
            const response = await postTableRowToAPI(this.state.chosenTable, rowForAPI, config);
            if(response?.status === 201){
                //update table in react
                this.loadTableData();
            }else{
                alert("L'ajout n'a pas pu être réalisé. Réessayez !");
            }
            this.closeModal();
        }catch(e){
            const errorMessage = getErrorMessageWithAPI(e.response);
            alert(errorMessage);
            console.error(e);
            if(!isJwtValid()){
                this.setState({redirectToLogin: true});
            }
        }
    }
}

Table.propTypes = {
    chosenTable: PropTypes.string
}

export default Table;