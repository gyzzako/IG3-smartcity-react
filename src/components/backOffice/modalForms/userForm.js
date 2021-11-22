import classes from '../BackOffice.module.css';

export function getUserForm(modalInstance){
    modalInstance.tempRow.isadmin = modalInstance.oldRowObject.isadmin ? true : false;
    return (
        <>
            <form className={classes.form}>
                <div>
                    <label htmlFor='firstname'>Prénom</label>
                    <input className="form-control"
                        type='text'
                        id='firstname'
                        name="firstname"
                        defaultValue={modalInstance.oldRowObject?.firstname}
                        onChange={(e) => { modalInstance.tempRow.firstname = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='lastname'>Nom</label>
                    <input className="form-control"
                        type='text'
                        id='lastname'
                        name="lastname"
                        defaultValue={modalInstance.oldRowObject?.lastname}
                        onChange={(e) => { modalInstance.tempRow.lastname = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='phoneNumber'>Téléphone</label>
                    <input className="form-control"
                        type='number'
                        id='phoneNumber'
                        name="phoneNumber"
                        defaultValue={modalInstance.oldRowObject?.phone_number}
                        onChange={(e) => { modalInstance.tempRow.phone_number = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='username'>Pseudo</label>
                    <input className="form-control"
                        type='text'
                        id='username'
                        name="username"
                        defaultValue={modalInstance.oldRowObject?.username}
                        onChange={(e) => { modalInstance.tempRow.username = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='password'>Mot de passe</label>
                    <input className="form-control"
                        type='password'
                        id='password'
                        name="password"
                        defaultValue={modalInstance.oldRowObject?.password}
                        onChange={(e) => { modalInstance.tempRow.password = e.target.value }}
                        required />
                </div>
                <div className="row">
                    <label htmlFor='isAdmin'>Administrateur</label>
                    <div className="col">
                        Oui<input type='radio'
                            name='isAdmin'
                            value='true'
                            defaultChecked={modalInstance.oldRowObject?.isadmin ? true : false}
                            onChange={(e) => {
                                if (e.target.value === "true") modalInstance.tempRow.isadmin = true;
                                else modalInstance.tempRow.isadmin = false;
                            }} />

                        Non<input type='radio'
                            name='isAdmin'
                            value='false'
                            defaultChecked={modalInstance.oldRowObject?.isadmin ? false : true}
                            onChange={(e) => {
                                if (e.target.value === "true") modalInstance.tempRow.isadmin = true;
                                else modalInstance.tempRow.isadmin = false;
                            }} />
                    </div>
                </div>
                <div>
                    <label htmlFor='province'>Province</label>
                    <input className="form-control"
                        type='text'
                        id='province'
                        name="province"
                        defaultValue={modalInstance.oldRowObject?.province}
                        onChange={(e) => { modalInstance.tempRow.province = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='city'>Ville</label>
                    <input className="form-control"
                        type='text'
                        id='city'
                        name="city"
                        defaultValue={modalInstance.oldRowObject?.city}
                        onChange={(e) => { modalInstance.tempRow.city = e.target.value }}
                        required />
                </div>
                <div>
                    <label htmlFor='streetAndNumber'>Rue et numéro</label>
                    <input className="form-control"
                        type='text'
                        id='streetAndNumber'
                        name="streetAndNumber"
                        defaultValue={modalInstance.oldRowObject?.street_and_number}
                        onChange={(e) => { modalInstance.tempRow.street_and_number = e.target.value }}
                        required />
                </div>
            </form>
        </>
    )
}

export function isUserFormValid(rowObject){
    if(rowObject.firstname === undefined || rowObject.firstname === "") throw new Error("Entrez un prénom valide");
    if(rowObject.lastname === undefined || rowObject.lastname === "") throw new Error("Entrez un nom valide");
    if(rowObject.phone_number === undefined || rowObject.phone_number === "") throw new Error("Entrez un numéro de téléphone valide");
    if(rowObject.username === undefined || rowObject.username === "") throw new Error("Entrez un pseudo valide");
    if(rowObject.password === undefined || rowObject.password === "") throw new Error("Entrez un mot de passe valide");
    if(rowObject.isadmin === undefined) throw new Error("Entrez un type d'utilisateur valide");
    if(rowObject.province === undefined || rowObject.province === "") throw new Error("Entrez une province valide");
    if(rowObject.city === undefined || rowObject.city === "") throw new Error("Entrez une ville valide");
    if(rowObject.street_and_number === undefined || rowObject.street_and_number === "") throw new Error("Entrez une rue et un numéro valide");
    
    return true;
}