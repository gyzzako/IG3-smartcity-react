import classes from '../BackOffice.module.css';
import {fromYYYYMMDDToDDMMYYYY, fromDDMMYYYYToYYYYMMDD} from '../../../utils/dateFormatConverter';


export function getOrderForm(modalInstance){
    let date;
    if (modalInstance.oldRowObject !== undefined) {
        date = fromDDMMYYYYToYYYYMMDD(modalInstance.oldRowObject.order_date);
    }else{
        date = fromDDMMYYYYToYYYYMMDD();
        modalInstance.tempRow.order_date = date;
    }
    return (
        <>
            <form className={classes.form}>
                <div>
                    <label htmlFor='orderDate'>Date de commande</label>
                    <input className="form-control" type="date" id="orderDate" name="orderDate"
                        defaultValue={date} required onChange={(e) => { modalInstance.tempRow.order_date = e.target.value }}>
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
            </form>
        </>
    )
}

export function isOrderFormValid(rowObject){
    if(rowObject.order_date === undefined || rowObject.order_date === "") throw new Error("Entrez une date de commande valide");
    if(rowObject.user_fk === undefined || isNaN(rowObject.user_fk)) throw new Error("Entrez un utilisateur valide");

    //formatage date
    rowObject.order_date = fromYYYYMMDDToDDMMYYYY(rowObject.order_date);

    return true;
}