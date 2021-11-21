import axios from 'axios';
import axiosRetry from 'axios-retry'; 

//exponential retry
//retry sur une erreur réseau ou 5xx sur GET, HEAD, OPTIONS, PUT ou DELETE
axiosRetry(axios, {
    retries: 3, // number of retries
    retryDelay: axiosRetry.exponentialDelay // délai exponentiel + délai random
});


const BASE_URL = "http://localhost:3001/v1/";

const getFullTableDataFromApi = async (tableName, config) => {
   return await axios.get(`${BASE_URL}${tableName}`, config);
}

const updateTableRowToAPI = async (tableName, rowData, config) => {
    return await axios.patch(`${BASE_URL}${tableName}`, rowData, config);
}

const getTableRowByIdFromAPI = async (tableName, id, config) => {
    return await axios.get(`${BASE_URL}${tableName}/${id}`, config);
}

const deleteTableRowToAPI = async (tableName, idObject, config) => {
    return await axios.delete(`${BASE_URL}${tableName}`, {data: idObject, headers: config.headers});
}

const postTableRowToAPI = async (tableName, rowData, config) => {
    return await axios.post(`${BASE_URL}${tableName}`, rowData, config);
}

const isUserAuthorizedForBackOfficeToAPI = async (config) => {
    return await axios.get("http://localhost:3001/v1/user/backoffice-authorization", config);
}

const loginUserWithAPI = async (data) => {
    return await axios.post('http://localhost:3001/v1/user/login', data);
}

export {getFullTableDataFromApi,
        updateTableRowToAPI,
        getTableRowByIdFromAPI,
        deleteTableRowToAPI,
        postTableRowToAPI,
        isUserAuthorizedForBackOfficeToAPI,
        loginUserWithAPI};