import axios from 'axios';

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

export {getFullTableDataFromApi,
        updateTableRowToAPI,
        getTableRowByIdFromAPI,
        deleteTableRowToAPI,
        postTableRowToAPI};