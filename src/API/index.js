import axios from 'axios';
import axiosRetry from 'axios-retry'; 

//exponential retry
//retry sur une erreur réseau ou 5xx sur GET, HEAD, OPTIONS, PUT ou DELETE
axiosRetry(axios, {
    retries: 3, // number of retries
    retryDelay: axiosRetry.exponentialDelay // délai exponentiel + délai random
});


const BASE_URL = "http://localhost:3001/v1/";

const getTableDataFromApi = async (tableName, config, rowNumberLimit, offset, searchElem) => {
    if(rowNumberLimit === undefined || offset === undefined){
        //get table entière (pour les petites tables genre catégorie)
        return await axios.get(`${BASE_URL}${tableName}`, config);
    }else{
        if(searchElem === undefined){
            //get les lignes de offset à offset + rowNumberLimit
            return await axios.get(`${BASE_URL}${tableName}/?rowLimit=${rowNumberLimit}&offset=${offset}`, config);
        }else{
            //get les lignes contenanent searchElem de offset à offset + rowNumberLimit
            return await axios.get(`${BASE_URL}${tableName}/?rowLimit=${rowNumberLimit}&offset=${offset}&searchElem=${searchElem}`, config);
        }        
    }
}

const getTableCountFromApi = async (tableName, config, searchElem) => {
    if(searchElem === undefined){
        return await axios.get(`${BASE_URL}${tableName}/count`, config);
    }else{
        return await axios.get(`${BASE_URL}${tableName}/count/?searchElem=${searchElem}`, config);
    }
}

const updateTableRowToAPI = async (tableName, rowData, config) => {
    return await axios.patch(`${BASE_URL}${tableName}`, rowData, config);
}

const deleteTableRowToAPI = async (tableName, idObject, config) => {
    return await axios.delete(`${BASE_URL}${tableName}`, {data: idObject, headers: config.headers});
}

const postTableRowToAPI = async (tableName, rowData, config) => {
    return await axios.post(`${BASE_URL}${tableName}`, rowData, config);
}

const isUserAuthorizedForBackOfficeToAPI = async (config) => {
    return await axios.get(`${BASE_URL}user/backoffice-authorization`, config);
}

const loginUserWithAPI = async (data) => {
    return await axios.post(`${BASE_URL}user/login`, data);
}

export {getTableDataFromApi,
        getTableCountFromApi,
        updateTableRowToAPI,
        deleteTableRowToAPI,
        postTableRowToAPI,
        isUserAuthorizedForBackOfficeToAPI,
        loginUserWithAPI,};