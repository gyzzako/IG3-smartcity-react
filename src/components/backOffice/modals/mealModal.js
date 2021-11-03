import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "@restart/ui/esm/Button";


class MealModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            closeModal: props.closeModalCallback
        }
        
    }    

    handleCloseModal = () => this.state.closeModal();

    render(){
        return(
        <>
        <Modal centered show={true} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ajout/Modifications</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <form>
                      <div>
                          <label htmlFor='nom'>Nom</label>
                          <input
                              type='text'
                              id='nom'
                              name="nom"
                              required />
                      </div>
                      <div>
                          <label htmlFor='description'>Description</label>
                          <input
                              type='text'
                              id='description'
                              name="description"
                              required />
                      </div>
                  </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleCloseModal}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
        </>
        )
    }
}

export default MealModal;