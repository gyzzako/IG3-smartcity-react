import React from "react";
import Header from "../header/Header";
import Category from "./Category";
import classes from './BackOffice.module.css';
import Button from "@restart/ui/esm/Button";
import UserModal from "./modals/UserModal";

class Table extends React.Component{
    constructor(){
        super();
        this.state={
            chosenCategory: undefined,
            tableColumnsName: ["id", "fistname", "lastname"], //TODO: faire avec api
            tableRows: [{ //API aussi
                id: 1,
                fistname: "arnaud",
                lastname: "berg"
            },
            {
                id: 2,
                fistname: "donny",
                lastname: "mboma"
            }],
            showModal: false
        }
    }

    handleCloseModal = () => this.setState({showModal: false});
    handleShowModal = () => this.setState({showModal: true});
    
    render(){
        return(
            <>{console.log(this.state.chosenCategory)}
                <Header />
                <div className={classes.backOffice}>
                    <Category chosenCategoryCallback={(category) => this.displayTable(category)}/>
                    <div className={classes.tableData}>
                        <table>
                            <thead>
                                <tr>
                                    <td>Action</td>
                                    {this.state.tableColumnsName.map((name, index) => {return(
                                        <td key={index}>{name}</td>
                                    );})}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tableRows.map((row, index) => {return(
                                        <tr key={index}>
                                            <td>
                                                <Button className="btn" onClick={() => {if(this.state.chosenCategory === "cat1"){
            this.handleShowModal();
        }}}><i className="far fa-edit"></i></Button>
                                                <Button className="btn" onClick={this.deleteRow}><i className="far fa-trash-alt"></i></Button>
                                            </td>
                                            <td>{row.id}</td>
                                            <td>{row.fistname}</td>
                                            <td>{row.lastname}</td>
                                        </tr>
                                );})}
                            </tbody>
                        </table>
                    </div>
                </div>
               {this.state.showModal && <UserModal closeModalCallback={() => this.handleCloseModal()}/>}
            </>
        );
    }

    displayTable(category){
        this.setState({chosenCategory: category});
    }

    openModal(){ 
        
    }
    deleteRow(){ //TODO: supprimer la ligne 

    }

    componentDidMount(){
        //api get table rows
    }
}

export default Table;