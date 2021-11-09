import React from "react";
import classes from './BackOffice.module.css';
import MealModal from "./Modal";
import axios from 'axios';
import objectFormatterForAPI from '../../utils/objectFormatterForAPI';

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chosenTable: props.chosenTable,
            tableRows: undefined,
            rowsToShow: undefined,
            showModal: false,
            showTable: false
        }
        this.rowObjectToModify = undefined

        //nom de colonnes perso pour chaque colonne dans les tables
        this.userTableColumnsName = [{id: "Id"}, {firstname: "Prénom"}, {lastname: "Nom"}, {phone_number: "Téléphone"}, {username: "Pseudo"}, {password: "Mot de passe"}, {isadmin: "Administrateur"}, {province: "Province"}, {city:"Ville"}, {street_and_number:"Rue et numéro"}];
        this.mealTableColumnsName = [{id: "Id"}, {name: "Nom"}, {description: "Description"}, {portion_number: "Nombre de portion"}, {publication_date: "Date de publication"}, {user_fk: "Id de l'utilisateur"}, {category_fk: "Id de la categorie"}, {order_fk: "Id de la commande"}, {image:"URL de l'image"}]; 
        this.orderTableColumnsName = [{id: "Id"}, {order_date: "Date de la commande"}, {user_fk: "Id de l'utilisateur"}]
        this.categoryTableColumnsName = [{id: "Id"}, {name: "Nom"}]
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
            try{
                const {data} = await axios.get(`http://localhost:3001/v1/${this.state.chosenTable}`);
                const rowsData = data;
                if(rowsData !== undefined){
                    this.setState({tableRows: rowsData, rowsToShow: undefined, showTable: true});
                }
            }catch(e){
                alert("API unreachable");
            }
            
        }
    }

    render(){
        let table;
        if(this.state.chosenTable === "user") table = this.createTable(this.userTableColumnsName);
        if(this.state.chosenTable === "meal") table = this.createTable(this.mealTableColumnsName);
        if(this.state.chosenTable === "order") table = this.createTable(this.orderTableColumnsName);
        if(this.state.chosenTable === "category") table = this.createTable(this.categoryTableColumnsName);

        return(
            <div className={classes.tableData}>
                <input onChange={(e) => {this.searchInTable(e.target.value)}} style={{float: "left", height: 40}} placeholder="Rechercher" type="text"/>
                <button onClick={() => this.showModal()} style={{backgroundColor : "#38015c", color: "white", float: "right"}} className="btn mb-3">AJOUTER</button>
                {this.state.showTable && table}
                {this.state.showTable && this.state.showModal && <MealModal rowObjectToModify={this.rowObjectToModify} closeModalCallback={() => this.closeModal()} 
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
                if(this.state.chosenTable === "meal"){
                    return row.name?.toLowerCase().includes(research.toLowerCase()) || row.description?.toLowerCase().includes(research.toLowerCase());
                }else if(this.state.chosenTable === "user"){
                    return row.firstname?.toLowerCase().includes(research.toLowerCase()) || row.lastname?.toLowerCase().includes(research.toLowerCase()) || row.username?.toLowerCase().includes(research.toLowerCase());
                }else if(this.state.chosenTable === "order"){
                    return row.order_date?.toLowerCase().includes(research.toLowerCase());
                }else if(this.state.chosenTable === "category"){
                    return row.name?.toLowerCase().includes(research.toLowerCase());
                }else{
                    return false;
                }
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
                    <tbody className={classes.tableBody}>
                        {tableRowsForUse.map((rowObject, index) => { //TODO: si on fait une api qui renvoie des objets -> faire un mapper qui genère le tableau en fonction des différentes tables
                            return (
                                <tr className={classes.tableRow} key={index}>
                                    <td>
                                        <button className="btn" onClick={() => {
                                            this.showModal(rowObject);
                                        }}><i className="far fa-edit"></i></button>
                                        <button className="btn" onClick={() => this.deleteRow(rowObject.id)}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                    {columnsNameObject.map((columnObject, index) => { return (this.tableCellFormatted(rowObject, columnObject, index)) })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>);
        }
    }

    tableCellFormatted(rowObject, columnObject, index){//formate la celulle du tableau si c'est une date ou un bool
        const property = Object.keys(columnObject)[0];
        if(typeof(rowObject[property]) === "boolean" && rowObject[property] === true){
            return <td key={index}>Oui</td>
        }else if(typeof(rowObject[property]) === "boolean" && rowObject[property] === false){
            return <td key={index}>Non</td>
        }
        return <td key={index}>{rowObject[property]}</td>
    }

    async saveModificationsModal(modifiedObject){
        if(this.rowObjectToModify !== undefined && !this.isOldAndNewRowEqual(this.rowObjectToModify,modifiedObject)){
            try{
                const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, modifiedObject);

                const response = await axios.patch(`http://localhost:3001/v1/${this.state.chosenTable}`, rowForAPI)
                if(response?.status === 204){
                    const id = modifiedObject.id;
                    let iTableRow;
                    //update table in react
                    iTableRow = this.state.tableRows.findIndex(row => row.id === id);
                    this.state.tableRows.splice(iTableRow, 1, modifiedObject)

                    //update searchTable in react
                    if(this.state.rowsToShow !== undefined){
                        iTableRow = this.state.rowsToShow.findIndex(row => row.id === id);
                        this.state.rowsToShow.splice(iTableRow, 1, modifiedObject)
                        this.setState({rowsToShow: this.state.rowsToShow});
                    }
                }else{
                    alert("Couldn't update database")
                }
            }catch(e){
                alert("Error while reaching API")
            }
        }
        this.closeModal();
    }

    isOldAndNewRowEqual(object1, object2) { //A modifier si on change la structure de modifiedObject -> CAD si une key est un objet lui aussi
        const keys1 = Object.keys(object1);
        for (let key of keys1) {
          if (object1[key] !== object2[key]) {
            return false;
          }
        }
        return true;
    }
    
    async deleteRow(id){ //TODO: supprimer la ligne
        const idForAPI = {
            id: id
        }
        try{
            const response = await axios.delete(`http://localhost:3001/v1/${this.state.chosenTable}`, { data: idForAPI }); //TODO: quand on met une fk qui n'exite pas pour order, category ou user -> pas de response mais direct dans le catch (pareil pour patch)
            if(response?.status === 204){
                //update table in react
                let iTableRow;
                iTableRow = this.state.tableRows.findIndex(row => row.id === id);
                this.state.tableRows.splice(iTableRow, 1);
                this.setState({tableRows: this.state.tableRows});

                //update searchTable in react
                if(this.state.rowsToShow !== undefined){
                    iTableRow = this.state.rowsToShow.findIndex(row => row.id === id);
                    this.state.rowsToShow.splice(iTableRow, 1)
                    this.setState({rowsToShow: this.state.rowsToShow});
                }
            }else{
                alert("Couldn't update database")
            }
        }catch(e){
            alert("Error while reaching API")
        }
    }

    async addNewRow(newRowObject){
        try{
            const rowForAPI = objectFormatterForAPI.formatObject(this.state.chosenTable, newRowObject);

            const response = await axios.post(`http://localhost:3001/v1/${this.state.chosenTable}`, rowForAPI);
            if(response?.status === 201){
                //update table in react
                this.getTableRowsFromAPI()
            }else{
                alert("Couldn't update database")
            }
        }catch(e){
            alert("Error while reaching API")
        }
        this.closeModal();
    }
}

export default Table;