import classes from '../BackOffice.module.css';

export function getCategoryForm(modalInstance){
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
            </form>
        </>
    )
}

export function isCategoryFormValid(rowObject){
    if(rowObject.name === undefined || rowObject.name === "") throw new Error("Entrez un nom valide");

    return true;
}