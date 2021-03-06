import React from "react";
import Button from 'react-bootstrap/Button';
import {getMealForm, isMealFormValid} from './modalForms/mealForm';
import {getUserForm, isUserFormValid} from './modalForms/userForm';
import {getOrderForm, isOrderFormValid} from './modalForms/orderForm';
import {getCategoryForm, isCategoryFormValid} from './modalForms/categoryForm';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class TableModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            closeModal: props.closeModalCallback,
            saveModifications: props.saveModificationsCallback,
            addNewRow: props.addNewRowCallback,
            chosenTable: props.chosenTable,
            form: {
                formContent: undefined,
                isFormValid: undefined,
                errorMessage: undefined
            }            
        }
        this.oldRowObject = props.rowObjectToModify; //copie par reference donc modifie aussi celui de base si on modifie la copie
        this.tempRow = {...props.rowObjectToModify}; //crée un nouvel objet mais avec les meme attributs
        this.isUsedForAModification = props.rowObjectToModify !== undefined ? true : false;

    }    
    async componentDidMount(){
        switch(this.state.chosenTable){
            case "meal":
                this.state.form.formContent = await getMealForm(this);
                this.state.form.isFormValid = isMealFormValid;
                this.setState({});
                break;
            case "user":
                this.state.form.formContent = getUserForm(this);
                this.state.form.isFormValid = isUserFormValid;
                this.setState({});
                break;
            case "order":
                this.state.form.formContent = getOrderForm(this);
                this.state.form.isFormValid = isOrderFormValid;
                this.setState({});
                break;
            case "category":
                this.state.form.formContent = getCategoryForm(this);
                this.state.form.isFormValid = isCategoryFormValid;
                this.setState({});
                break;
            default:
                this.state.form.errorMessage = "Error: Table not found !";
        }

    }

    closeModal(){
        this.state.closeModal();
    }

    saveModifications(){
        try{
            if(this.state.form.errorMessage === undefined && this.state.form.isFormValid(this.tempRow)){ //vérification des champs
                if(this.isUsedForAModification){
                    //depuis le bouton modifier
                    this.state.saveModifications(this.tempRow);
                }else{
                    //depuis le bouton ajouter
                    this.state.addNewRow(this.tempRow);
                }
            }
        }catch(e){
            alert(e);
        }
    }


    render(){
        return(
            <>
            <Modal size="lg" centered show={true} onHide={() => this.closeModal()}>
            <Modal.Header closeButton>
                <Modal.Title>{this.isUsedForAModification ? "Modification" : "Ajout"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {this.state.form.errorMessage === undefined && this.state.form.formContent}
            {this.state.form.errorMessage !== undefined && this.state.form.errorMessage}

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => this.closeModal()}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={() => this.saveModifications()}>
                    Sauvegarder
                </Button>
            </Modal.Footer>
            </Modal>
            </>
        );
    }
}

TableModal.propTypes = {
    closeModalCallback: PropTypes.func.isRequired,
    saveModificationsCallback: PropTypes.func.isRequired,
    addNewRowCallback: PropTypes.func.isRequired,
    chosenTable: PropTypes.string,
    rowObjectToModify: PropTypes.object
}

export default TableModal;