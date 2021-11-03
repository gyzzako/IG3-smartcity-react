import React from "react";
import classes from './BackOffice.module.css';
import Button from "@restart/ui/esm/Button";
import UserModal from "./modals/UserModal";
import MealModal from "./modals/MealModal";
import OrderModal from "./modals/OrderModal";
import CategoryModal from "./modals/CategoryModal";
import axios from 'axios';

class Table extends React.Component{
    constructor(props){
        super(props);
        this.state={
            chosenTable: props.chosenTable,
            tableRows: undefined,
            showModal: false,
            showTable: false
        }

        //nom de colonnes perso pour chaque colonne dans les tables
        this.userTableColumnsName = [{id: "Id"}, {firstname: "Prénom"}, {lastname: "Nom"}, {phone_number: "Téléphone"}, {username: "Pseudo"}, {password: "Mot de passe"}, {isadmin: "Administrateur"}, {province: "Province"}, {city:"Ville"}, {street_and_number:"Rue et numéro"}];
        this.mealTableColumnsName = [{id: "Id"}, {name: "Nom"}, {description: "Description"}, {portion_number: "Nombre de portion"}, {publication_date: "Date de publication"}, {user_fk: "Id de l'utilisateur"}, {category_fk: "Id de la categorie"}, {order_fk: "Id de la commande"}, {image:"Lien vers l'image"}]; 
        this.orderTableColumnsName = [{id: "Id"}, {order_date: "Date de la commande"}, {user_fk: "Id de l'utilisateur"}]
        this.categoryTableColumnsName = [{id: "Id"}, {name: "Nom"}]
     }

    handleCloseModal = () => this.setState({showModal: false});
    handleShowModal = () => this.setState({showModal: true});
    
    async componentDidMount(){
        if(this.state.chosenTable !== undefined){
            const response = await axios.get(`http://localhost:3001/v1/${this.state.chosenTable}`);
            const rowsData = response?.data;
            if(rowsData !== undefined){
                this.setState({tableRows: rowsData, showTable: true});
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
                {this.state.showTable && table}

                {this.state.showModal && this.state.chosenTable === "user" && <UserModal closeModalCallback={() => this.handleCloseModal()}/>}
                {this.state.showModal && this.state.chosenTable === "meal" && <MealModal closeModalCallback={() => this.handleCloseModal()}/>}
                {this.state.showModal && this.state.chosenTable === "order" && <OrderModal closeModalCallback={() => this.handleCloseModal()}/>}
                {this.state.showModal && this.state.chosenTable === "category" && <CategoryModal closeModalCallback={() => this.handleCloseModal()}/>}
            </div>
        );
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
                            <tr key={index}>
                                <td>
                                    <Button className="btn" onClick={() => {this.handleShowModal();}}><i className="far fa-edit"></i></Button>
                                    <Button className="btn" onClick={this.deleteRow}><i className="far fa-trash-alt"></i></Button>
                                </td>
                                {
                                    columnsNameObject.map((columnObject, index) => {
                                        const property = Object.keys(columnObject)[0];
                                        if(typeof(rowObject[property]) === "boolean" && rowObject[property] === true){
                                            return <td key={index}>Oui</td>
                                        }else if(typeof(rowObject[property]) === "boolean" && rowObject[property] === false){
                                            return <td key={index}>Non</td>
                                        }
                                        return <td key={index}>{rowObject[property]}</td>
                                    })
                                }
                            </tr>
                        );
                    })}
                </tbody>
            </table>);
        }
    }
    
    deleteRow(){ //TODO: supprimer la ligne

    }
}

export default Table;