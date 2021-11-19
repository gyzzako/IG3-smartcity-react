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