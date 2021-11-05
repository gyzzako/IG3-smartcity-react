const {fromDDMMYYYYToYYYYMMDD} = require('./dateFormatConverter');

module.exports.formatObject = (rowOfTableName, modifiedObject) => {
    if(rowOfTableName === "meal"){
        let rowForAPI = {...modifiedObject};
        rowForAPI.publication_date = fromDDMMYYYYToYYYYMMDD(rowForAPI.publication_date); //formatage date pour DB

        rowForAPI.category = {
            id: rowForAPI.category_fk
        };
        delete rowForAPI.category_fk;
    
        rowForAPI.user =  {
            id: rowForAPI.user_fk
        };
        delete rowForAPI.user_fk;
    
        if(rowForAPI.order_fk !== undefined){ //pcq order n'est pas obligatoire
            rowForAPI.order =  {
                id: rowForAPI.order_fk
            };
        }
        delete rowForAPI.order_fk;
    
        return rowForAPI;
    }else if(rowOfTableName === "user"){
        let rowForAPI = {...modifiedObject};

        rowForAPI.is_admin = rowForAPI.isadmin;
        delete rowForAPI.isadmin;
    
        return rowForAPI;
    }else if(rowOfTableName === "order"){
        let rowForAPI = {...modifiedObject};
        rowForAPI.order_date = fromDDMMYYYYToYYYYMMDD(rowForAPI.order_date); //formatage date pour DB

        rowForAPI.user = {
            id: rowForAPI.user_fk
        };
        delete rowForAPI.user_fk;
    
        return rowForAPI;
    }else if(rowOfTableName === "category"){
        let rowForAPI = {...modifiedObject};
    
        return rowForAPI;
    }
    
}