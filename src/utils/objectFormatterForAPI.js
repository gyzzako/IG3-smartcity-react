const {fromDDMMYYYYToYYYYMMDD} = require('./dateFormatConverter');

module.exports.formatObject = (rowOfTableName, modifiedObject) => {
    if(rowOfTableName === "meal"){
        let rowForAPI = {...modifiedObject};

        rowForAPI.publication_date = fromDDMMYYYYToYYYYMMDD(rowForAPI.publication_date); //formatage date pour DB
        //formdata pour passer l'image
        const formData = new FormData();
        formData.append('id', rowForAPI.id);
        formData.append('name', rowForAPI.name);
        formData.append('description', rowForAPI.description);
        formData.append('portion_number', rowForAPI.portion_number);
        formData.append('publication_date', rowForAPI.publication_date); //formatage date pour DB
        formData.append('user_fk', rowForAPI.user_fk);
        formData.append('category_fk', rowForAPI.category.id);
        if(rowForAPI.order_fk !== undefined && rowForAPI.order_fk !== null) formData.append('order_fk', rowForAPI.order_fk);
        formData.append('image', rowForAPI.image);
        if(rowForAPI.oldImageName !== undefined && rowForAPI.oldImageName !== null) formData.append('oldImageName', rowForAPI.oldImageName);
    
        return formData;
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
        return modifiedObject; //car pas de modif nécéssaire
    }
    
}