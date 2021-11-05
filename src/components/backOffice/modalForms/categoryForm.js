import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from '../BackOffice.module.css';

export function getCategoryForm(modalInstance){
    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>Ajout/Modifications</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className={classes.form}>
                    <div>
                        <label htmlFor='nom'>Nom</label>
                        <input className="form-control"
                            type='text'
                            id='nom'
                            name="nom"
                            defaultValue={modalInstance.oldRowObject?.name}
                            onChange={(e) => { modalInstance.tempRow.name = e.target.value }}
                            required />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => modalInstance.CloseModal()}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={() => modalInstance.saveModifications()}>
                    Sauvegarder
                </Button>
            </Modal.Footer>
        </>
    )
}

export function isCategoryFormValid(rowObject){
    if(rowObject.name === undefined || rowObject.name === "") throw new Error("Entrez un nom valide");

    return true;
}