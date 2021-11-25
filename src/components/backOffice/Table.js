import React from "react";
import classes from './BackOffice.module.css';
import TableModal from "./TableModal";
import objectFormatterForAPI from '../../utils/objectFormatterForAPI';
import {getAPIHeaderWithJWTToken, getErrorMessageWithAPI} from '../../utils/utils';
import {getFullTableDataFromApi, updateTableRowToAPI,
        getTableRowByIdFromAPI, deleteTableRowToAPI,
        postTableRowToAPI} from '../../API/index';
import PropTypes from 'prop-types';
import {userHasToRelog} from '../../utils/utils';
import { Redirect } from "react-router-dom";
import {mealTableBodyMapper} from './tableContent/meal';

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chosenTable: props.chosenTable,
            tableRows: undefined,
            rowsToShow: undefined,
            showModal: false,
            showTable: false,
            redirectToLogin: false
        }
        this.rowObjectToModify = undefined

        //nom de colonnes perso pour chaque colonne dans les tables
        this.userTableColumnsName = [{id: "Id"}, {firstname: "Prénom"}, {lastname: "Nom"}, {phone_number: "Téléphone"}, {username: "Pseudo"}, {isadmin: "Administrateur"}, {province: "Province"}, {city:"Ville"}, {street_and_number:"Rue et numéro"}];
        this.mealTableColumnsName = [{id: "Id"}, {name: "Nom"}, {description: "Description"}, {portion_number: "Nombre de portion"}, {publication_date: "Date de publication"}, {user_fk: "Id de l'utilisateur"}, {category_fk: "Id de la categorie"}, {order_fk: "Id de la commande"}, {image:"Nom de l'image"}]; 
        this.orderTableColumnsName = [{id: "Id"}, {order_date: "Date de la commande"}, {user_fk: "Id de l'utilisateur"}]
        this.categoryTableColumnsName = [{id: "Id"}, {name: "Nom"}]

        this.check = undefined
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
        await this.getTableRowsFromAPI();
    }
    
    async getTableRowsFromAPI(){
        if(this.state.chosenTable !== undefined){
            const config = getAPIHeaderWithJWTToken();
            try{
                const {data} = await getFullTableDataFromApi(this.state.chosenTable, config);
                const rowsData = data;
                if(rowsData !== undefined){
                    this.setState({tableRows: rowsData, rowsToShow: undefined, showTable: true});
                }
            }catch(e){
                const errorMessage = getErrorMessageWithAPI(e.response);
                alert(errorMessage);
                console.error(e);
                if(userHasToRelog()){
                    this.setState({redirectToLogin: true});
                }
            }
        }
    }

    render(){
        if(this.state.redirectToLogin) return <Redirect to="/connexion"/>

        let table;
        switch(this.state.chosenTable){
            case "meal":
                table = this.createTable(this.mealTableColumnsName);
                this.check = (row, research) => {return row.id === parseInt(research) || row.name?.toLowerCase().includes(research.toLowerCase()) || row.description?.toLowerCase().includes(research.toLowerCase())};
                break;
            case "user":
                table = this.createTable(this.userTableColumnsName);
                this.check = (row, research) => {return row.id === parseInt(research) || row.firstname?.toLowerCase().includes(research.toLowerCase()) || row.lastname?.toLowerCase().includes(research.toLowerCase()) || row.username?.toLowerCase().includes(research.toLowerCase())};
                break;
            case "order":
                table = this.createTable(this.orderTableColumnsName);
                this.check = (row, research) => {return row.id === parseInt(research) || row.order_date?.toLowerCase().includes(research.toLowerCase())};
                break;
            case "category":
                table = this.createTable(this.categoryTableColumnsName);
                this.check = (row, research) => {return row.id === parseInt(research) || row.name?.toLowerCase().includes(research.toLowerCase())};
                break;
            default:
                table = undefined;
        }

        return(
            <div className={classes.tableData}>
                <input onChange={(e) => {this.searchInTable(e.target.value)}} style={{float: "left", height: 40}} placeholder="Rechercher" type="text"/>
                <button onClick={() => this.showModal()} style={{backgroundColor : "#38015c", color: "white", float: "right"}} className="btn mb-3">AJOUTER</button>
                <div className={classes.table}>
                    {this.state.showTable && table}
                </div>
                {this.state.showTable && this.state.showModal && <TableModal rowObjectToModify={this.rowObjectToModify} closeModalCallback={() => this.closeModal()} 
                    saveModificationsCallback={(newRowObject) => { this.saveModificationsModal(newRowObject) }} 
                    addNewRowCallback={(newRowObject) => { this.addNewRow(newRowObject) }} key={this.state.chosenTable} chosenTable={this.state.chosenTable}/>
                }
            </div>
        );
    }

    searchInTable(research){
        if(this.state.tableRows){
            const rowsToShow = this.state.tableRows;
            const afterFiltering = rowsToShow.filter(row => {
                return this.check(row, research);
            })
            this.setState({rowsToShow: afterFiltering});
        }
    }

    createTable(columnsNameObject){
        let tableRowsForUse;
        if(this.state.rowsToShow === undefined && this.state.tableRows !== undefined){
            //table quand pas de recherche
            tableRowsForUse = this.state.tableRows
        }else if(this.state.rowsToShow !== undefined){
            //table quand on recherche
            tableRowsForUse = this.state.rowsToShow
        }

        if(tableRowsForUse !== undefined){
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
                        {tableRowsForUse.map((rowObject, index) => { //TODO: si on fait une api qui renvoie des objets -> faire un mapper qui genère le tableau en fonction des différentes tables
                            return (
                                <tr className={classes.tableRow} key={index}>
                                    <td>
                                        <button className="btn far fa-edit" onClick={() => { //modify button
                                            this.showModal(rowObject);
                                        }}></button>
                                        <button className="btn far fa-trash-alt" onClick={() => this.deleteRow(rowObject.id)}></button>
                                    </td>
                                    {mealTableBodyMapper(rowObject)}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>);
        }
    }

   /*  tableCellFormatted(rowObject, columnObject, index){//formate la celulle du tableau si c'est une date ou un bool
        const property = Object.keys(columnObject)[0];
        if(typeof(rowObject[property]) === "boolean" && rowObject[property] === true){
            return <td key={index}>Oui</td>
        }else if(typeof(rowObject[property]) === "boolean" && rowObject[property] === false){
            return <td key={index}>Non</td>
        }else if(index === 8 && rowObject?.image !== undefined && rowObject?.image !== null && rowObject.image.endsWith('.jpeg')){ // 8 car l'image se trouve à la 9e colonne //TODO: faire dynamiquement ? 
            const imgTag = <img src={`http://localhost:3001/mealimages/${rowObject.image}`} alt="meal" width="200" height="185"/>;
            return <td key={index}>{imgTag}</td>
        }
        return <td key={index}>{rowObject[property]}</td>
    } */

    async saveModificationsModal(modifiedObject){
        if(this.rowObjectToModify !== undefined && !this.isOldAndNewRowEqual(this.rowObjectToModify,modifiedObject)){
            
            try{
                const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, modifiedObject);

                const config = getAPIHeaderWithJWTToken();
                const patchResponse = await updateTableRowToAPI(this.state.chosenTable, rowForAPI, config);
                if(patchResponse?.status === 204){
                    const id = modifiedObject.id;
                    const {data} = await getTableRowByIdFromAPI(this.state.chosenTable, id, config)
                    const rowData = data[0];
                    if (rowData !== undefined) {
                        // pour de meilleures performances on récup seulement le user updated pour update le tableau contenant tous les users
                        this.updateLocalTableAfterModifications(id, rowData);
                    }else{//si on arrive pas à récup seulement le user updated, on récupère tous les users
                        this.getTableRowsFromAPI()
                    }
                }else{
                    alert("Les modifications n'ont pas pu être enregistrées. Réessayez !");
                }
                this.closeModal();
            }catch(e){
                const errorMessage = getErrorMessageWithAPI(e.response);
                alert(errorMessage);
                console.error(e);
                if(userHasToRelog()){
                    this.setState({redirectToLogin: true});
                }
            }
        }else{
            this.closeModal();
        }
    }

    isOldAndNewRowEqual(object1, object2) {//check si l'objet à tous les niveaux de profondeur si il est le même
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (const key of keys1) {
          const val1 = object1[key];
          const val2 = object2[key];
          const areObjects = this.isObject(val1) && this.isObject(val2);
          if ((areObjects && !this.deepEqual(val1, val2)) || (!areObjects && val1 !== val2)){
            return false;
          }
        }
        return true;
    }
    isObject(object) {
        return object != null && typeof object === 'object';
      }
    
    async deleteRow(id){ //TODO: supprimer la ligne
        const idForAPI = {
            id: id
        }
        try{
            const config = getAPIHeaderWithJWTToken();
            const response = await deleteTableRowToAPI(this.state.chosenTable, idForAPI, config); //TODO: quand on met une fk qui n'exite pas pour order, category ou user -> pas de response mais direct dans le catch (pareil pour patch)
            if(response?.status === 204){
                //pour de meilleures performances on récup ne récupère pas tous les users, on modifie en local
                this.updateLocalTableAfterModifications(id);
            }else{
                alert("La suppresion n'a pas pu être réalisée. Réessayez !")
            }
        }catch(e){
            const errorMessage = getErrorMessageWithAPI(e.response);
            alert(errorMessage);
            console.error(e);
            if(userHasToRelog()){
                this.setState({redirectToLogin: true});
            }
        }
    }

    updateLocalTableAfterModifications(idToFind, rowData){//si rowData !== undefined => c'est que cette méthode a été appellée depuis 'saveModificationsModal' sinon de 'deleteRow'
        let iTableRow;

        //update table in react
        iTableRow = this.state.tableRows.findIndex(row => row.id === idToFind);
        if(rowData !== undefined){
            this.state.tableRows.splice(iTableRow, 1, rowData); //ré-insère la ligne modifiée dans le tableau au bon endroit
        }else{
            this.state.tableRows.splice(iTableRow, 1); //supprime la ligne supprimée dans le tableau
        }
        this.setState({tableRows: this.state.tableRows});

        //update searchTable in react
        if(this.state.rowsToShow !== undefined){
            iTableRow = this.state.rowsToShow.findIndex(row => row.id === idToFind);
            if(rowData !== undefined){
                this.state.rowsToShow.splice(iTableRow, 1, rowData) //ré-insère la ligne modifiée dans le tableau au bon endroit
            }else{
                this.state.rowsToShow.splice(iTableRow, 1) //supprime la ligne supprimée dans le tableau
            }
            this.setState({rowsToShow: this.state.rowsToShow});
        }
    }

    async addNewRow(newRowObject){
        try{
            const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, newRowObject);

            const config = getAPIHeaderWithJWTToken();
            const response = await postTableRowToAPI(this.state.chosenTable, rowForAPI, config);
            if(response?.status === 201){
                //update table in react
                this.getTableRowsFromAPI();
            }else{
                alert("L'ajout n'a pas pu être réalisé. Réessayez !");
            }
            this.closeModal();
        }catch(e){
            const errorMessage = getErrorMessageWithAPI(e.response);
            alert(errorMessage);
            console.error(e);
            if(userHasToRelog()){
                this.setState({redirectToLogin: true});
            }
        }
        
    }
}

Table.propTypes = {
    chosenTable: PropTypes.string
}

export default Table;