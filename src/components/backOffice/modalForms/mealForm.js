import classes from '../BackOffice.module.css';
import {fromYYYYMMDDToDDMMYYYY, fromDDMMYYYYToYYYYMMDD} from '../../../utils/dateFormatConverter';
import { getAPIHeaderWithJWTToken } from '../../../utils/utils';
import {getTableDataFromApi} from '../../../API/index';

export async function getMealForm(modalInstance){
    const config = getAPIHeaderWithJWTToken();
    const {data: categories} = await getTableDataFromApi("category", config);

    const categoryOptions = categories.map(category => {
        return (
            <option category_id={category.id} key={category.id}>{category.name}</option>
        );
    })

    //de base pour le cas si il laisse la categorie de base
    let category = {
        id: categories[0].id,
        name: categories[0].name
    }
    modalInstance.tempRow.category = category;

    let date;
    if (modalInstance.oldRowObject !== undefined) {
        date = fromDDMMYYYYToYYYYMMDD(modalInstance.oldRowObject.publication_date);

        modalInstance.tempRow.category.id = categories[0].id;
    }else{
        date = fromDDMMYYYYToYYYYMMDD();
        modalInstance.tempRow.publication_date = date;
    }

    modalInstance.tempRow.oldImageName = modalInstance.oldRowObject?.image;

    return (
        <>
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
                        defaultValue={date} required onChange={(e) => { modalInstance.tempRow.publication_date = e.target.value }}>
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
                    <label htmlFor='categoryName'>Nom de la catégorie</label>
                    <select defaultValue={modalInstance.oldRowObject?.category?.name} onChange={(e) => { 
                                        const selectedIndex = e.target.options.selectedIndex;
                                        modalInstance.tempRow.category.id = e.target.options[selectedIndex].getAttribute('category_id');
                                        modalInstance.tempRow.category.name = e.target.value;}}
                                        className="form-control">
                        {categoryOptions}
                    </select>
                </div>
                <div>
                    <label htmlFor='orderId'>Id de la commande</label>
                    <input className="form-control"
                        type='number'
                        id='orderId'
                        name="orderId"
                        min="0"
                        defaultValue={modalInstance.oldRowObject?.order_fk}
                        onChange={(e) => {modalInstance.tempRow.order_fk = isNaN(parseInt(e.target.value)) ? undefined : parseInt(e.target.value) }}
                        required />
                </div>
                <div>
                    <label htmlFor='image'>Image</label>
                    <input className="form-control"
                        type={"file"}
                        accept={"image/*"}
                        id='image'
                        name="image"
                        //defaultValue={modalInstance.oldRowObject?.image} SUPP si reste upload image marche
                        onChange={(e) => { modalInstance.tempRow.image = e.target.files[0]}}
                        required />
                </div>
            </form>
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
    if(rowObject.category.id === undefined || isNaN(rowObject.category.id)) throw new Error("Entrez une categorie valide");
    if(rowObject.image === undefined || rowObject.image === "") throw new Error("Entrez un lien d'image valide");

    //formatage date
    rowObject.publication_date = fromYYYYMMDDToDDMMYYYY(rowObject.publication_date);

    return true;
}