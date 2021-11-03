import React from "react";
import Modal from 'react-bootstrap/Modal';
import Button from "@restart/ui/esm/Button";


class UserModal extends React.Component{
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
                          <label htmlFor='pseudo'>Firstname</label>
                          <input
                              type='text'
                              id='pseudo'
                              name="username"
                              required />
                      </div>
                      <div >
                          <label htmlFor='password'>Mot de passe</label>
                          <input
                              type='password'
                              id='password' name=""
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

export default UserModal;