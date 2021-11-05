module.exports.fromYYYYMMDDToDDMMYYYY = (date) => {
    let unformatedDate;
    if(date.split('-')[0].length === 4){
        const [year, month, day] = date.split("-");
        unformatedDate = new Date(year, month - 1, day);
    }else{
        const [day, month, year] = date.split("-");
        unformatedDate = new Date(year, month - 1, day);
    }
    return(('0' + unformatedDate.getDate()).slice(-2) + '-' + ('0' + (unformatedDate.getMonth() + 1)).slice(-2) + '-' + unformatedDate.getFullYear());
}

module.exports.fromDDMMYYYYToYYYYMMDD = (date) => {
    let unformatedDate;
    if(date !== undefined && date.includes("-")){
        const [day, month, year] = date.split("-");
        unformatedDate = new Date(year, month - 1, day);
    }else{
        unformatedDate = new Date();
    }
    return(unformatedDate.getFullYear() + '-' + ('0' + (unformatedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + unformatedDate.getDate()).slice(-2));
}