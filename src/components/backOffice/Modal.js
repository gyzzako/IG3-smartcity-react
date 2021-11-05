import React from "react";
import {getMealForm, isMealFormValid} from './modalForms/mealForm';
import {getUserForm, isUserFormValid} from './modalForms/userForm';
import {getOrderForm, isOrderFormValid} from './modalForms/orderForm';
import {getCategoryForm, isCategoryFormValid} from './modalForms/categoryForm';
import Modal from 'react-bootstrap/Modal';

class MealModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            closeModal: props.closeModalCallback,
            saveModifications: props.saveModificationsCallback,
            addNewRow: props.addNewRowCallback,
            chosenTable: props.chosenTable,
            form: undefined,
            formVerifer: undefined
            
        }
        this.oldRowObject = props.rowObjectToModify; //copie par reference donc modifie aussi celui de base si on modifie la copie
        this.tempRow = {...props.rowObjectToModify}; //crée un nouvel objet mais avec les meme attributs

        if(this.state.chosenTable === "meal"){
            this.state.form = getMealForm(this);
            this.state.formVerifer = isMealFormValid;
        }else if(this.state.chosenTable === "user"){
            this.state.form = getUserForm(this);
            this.state.formVerifer = isUserFormValid;
        }else if(this.state.chosenTable === "order"){
            this.state.form = getOrderForm(this);
            this.state.formVerifer = isOrderFormValid;
        }else if(this.state.chosenTable === "category"){
            this.state.form = getCategoryForm(this);
            this.state.formVerifer = isCategoryFormValid;
        }
    }    

    CloseModal(){
        this.oldRowObject = undefined;
        this.state.closeModal();
    }

    saveModifications(){
        try{
            if(this.state.formVerifer(this.tempRow)){ //vérification des champs
                if(this.props.rowObjectToModify === undefined){
                    //depuis le bouton ajouter
                    this.state.addNewRow(this.tempRow);
                }else{
                    //depuis le bouton modifier
                    this.state.saveModifications(this.tempRow);
                }
            }
        }catch(e){
            alert(e);
        }
    }


    render(){
        return(
            <>
            <Modal size="lg" centered show={true} onHide={() => this.CloseModal()}>
            {this.state.form}
            </Modal>
            </>
        );
    }
}

export default MealModal;