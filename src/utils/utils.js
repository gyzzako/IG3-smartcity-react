const apiBasicErrorMessage = "Erreur lors de l'accès à l'API";
const api4xxErrorMessage = "Impossible de réaliser cette action";
const api5xxErrorMessage = "Impossible de réaliser cette action pour le moment. Réessayer plus tard";

module.exports.getAPIHeaderWithJWTToken = () => {
    const jwtToken = localStorage.getItem("jwt");
    let config;
    if (jwtToken !== null) {
        config = {
            headers: {
                Authorization: "Bearer " + jwtToken
            }
        }
    }
    return config;
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

module.exports.userHasToRelog = () => {
    return localStorage.getItem("jwt") === null ? true : false;
}