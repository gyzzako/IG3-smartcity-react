import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classes from '../BackOffice.module.css';
import {fromYYYYMMDDToDDMMYYYY, fromDDMMYYYYToYYYYMMDD} from '../../../utils/dateFormatConverter';

export function getMealForm(modalInstance){
    let date;
    if (modalInstance.oldRowObject !== undefined) {
        date = fromDDMMYYYYToYYYYMMDD(modalInstance.oldRowObject.publication_date);
    }else{
        date = fromDDMMYYYYToYYYYMMDD();
        modalInstance.tempRow.publication_date = date;
    }
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
                    <div>
                        <label htmlFor='description'>Description</label>
                        <input className="form-control"
                            type='text'
                            id='description'
                            name="description"
                            defaultValue={modalInstance.oldRowObject?.description}
                            onChange={(e) => { modalInstance.tempRow.description = e.target.value }}
                            required />
                    </div>
                    <div>
                        <label htmlFor='portion'>Nombre de portion</label>
                        <input className="form-control"
                            type='number'
                            id='portion'
                            name="portion"
                            min="1"
                            defaultValue={modalInstance.oldRowObject?.portion_number}
                            onChange={(e) => { modalInstance.tempRow.portion_number = parseInt(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <label htmlFor='publicationDate'>Date de publication</label>
                        <input className="form-control" type="date" id="publicationDate" name="publicationDate"
                            defaultValue={date} required onChange={(e) => {modalInstance.tempRow.publication_date = e.target.value}}>
                        </input>
                    </div>
                    <div>
                        <label htmlFor='userId'>Id de l'utilisateur</label>
                        <input className="form-control"
                            type='number'
                            id='userId'
                            name="userId"
                            min="0"
                            defaultValue={modalInstance.oldRowObject?.user_fk}
                            onChange={(e) => { modalInstance.tempRow.user_fk = parseInt(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <label htmlFor='categoryId'>Id de la catégorie</label>
                        <input className="form-control"
                            type='number'
                            id='categoryId'
                            name="categoryId"
                            min="0"
                            defaultValue={modalInstance.oldRowObject?.category_fk}
                            onChange={(e) => { modalInstance.tempRow.category_fk = parseInt(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <label htmlFor='orderId'>Id de la commande</label>
                        <input className="form-control"
                            type='number'
                            id='orderId'
                            name="orderId"
                            min="0"
                            defaultValue={modalInstance.oldRowObject?.order_fk}
                            onChange={(e) => { modalInstance.tempRow.order_fk = parseInt(e.target.value) }}
                            required />
                    </div>
                    <div>
                        <label htmlFor='imageURL'>URL de l'image</label>
                        <input className="form-control"
                            type='text'
                            id='imageURL'
                            name="imageURL"
                            defaultValue={modalInstance.oldRowObject?.image}
                            onChange={(e) => { modalInstance.tempRow.image = e.target.value }}
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

export function isMealFormValid(rowObject){
    if(rowObject.name === undefined || rowObject.name === "") throw new Error("Entrez un nom valide");
    if(rowObject.description === undefined || rowObject.description === "") throw new Error("Entrez une description valide");
    if(rowObject.portion_number === undefined || isNaN(rowObject.portion_number)) throw new Error("Entrez un nombre de portion valide");
    if(rowObject.portion_number < 1) throw new Error("Entrez un nombre de portion supérieur à 0");
    if(rowObject.publication_date === undefined || rowObject.publication_date === "") throw new Error("Entrez une date valide");
    if(rowObject.user_fk === undefined || isNaN(rowObject.user_fk)) throw new Error("Entrez un utilisateur valide");
    if(rowObject.category_fk === undefined || isNaN(rowObject.category_fk)) throw new Error("Entrez une categorie valide");
    if(rowObject.image === undefined || rowObject.image === "") throw new Error("Entrez un lien d'image valide");

    //formatage date
    rowObject.publication_date = fromYYYYMMDDToDDMMYYYY(rowObject.publication_date);

    return true;
}