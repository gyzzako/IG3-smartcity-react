const apiBasicErrorMessage = "Erreur lors de l'accès à l'API";
const api4xxErrorMessage = "Impossible de réaliser cette action";
const api5xxErrorMessage = "Impossible de réaliser cette action pour le moment. Réessayer plus tard";

const _this = this; //pour pouvoir utiliser la méthode isJwtValid dans ce fichier

module.exports.getAPIHeaderWithJWTToken = (tableName) => {
    const jwtToken = localStorage.getItem("jwt");
    const isValid = _this.isJwtValid(jwtToken);
    let config;
    if(isValid){
        if (jwtToken !== null) {
            if(tableName === "meal"){
                config = {
                    headers: {
                        Authorization: "Bearer " + jwtToken,
                        'Content-Type' : 'multipart/form-data'
                    }
                }
            }else{
                config = {
                    headers: {
                        Authorization: "Bearer " + jwtToken
                    }
                }
            }
        }
    }
    return config;
}

module.exports.isJwtValid = (jwtToken) =>{
    if(jwtToken === null || jwtToken === undefined) jwtToken = localStorage.getItem("jwt");
    if(jwtToken !== null && jwtToken !== undefined){
        const base64Token =  jwtToken.split('.')[1];
        const payload = JSON.parse(Buffer.from(base64Token, 'base64').toString('utf-8'));
        if(Date.now() < payload.exp*1000) return true;
        else{
            localStorage.removeItem("jwt");
            return false;
        }
    }else{
        localStorage.removeItem("jwt");
        return false;
    }
}

module.exports.getErrorMessageWithAPI = (responseObject) => {
    let errorMessage;

    if(responseObject?.status === 400 && responseObject?.data?.error === "jwt token expiré"){
        localStorage.removeItem("jwt");
    }else{
        errorMessage = responseObject?.data?.error;
    }

    if (errorMessage === undefined) {
        if (responseObject?.status.toString().startsWith('4')) { //toutes les erreurs 4xx
            errorMessage = api4xxErrorMessage;
        } else if (responseObject?.status.toString().startsWith('5')) { //toutes les erreurs 5xx
            errorMessage = api5xxErrorMessage;
        } else {
            errorMessage = apiBasicErrorMessage;
        }
    }
    return errorMessage;
}

module.exports.isLocalStorageAvailable = () => {
    try {
        const temp = '__storage_test__';
        localStorage.setItem(temp, temp);
        localStorage.removeItem(temp);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED');
    }
}

module.exports.isOldAndNewRowEqual = (object1, object2) => {//check l'objet à tous les niveaux de profondeur si il est le même
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if ((areObjects && !this.deepEqual(val1, val2)) || (!areObjects && val1 !== val2)){
        return false;
      }
    }
    return true;
}
function isObject(object) {
    return object != null && typeof object === 'object';
}