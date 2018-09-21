import axios from 'axios';

export const api = "https://5ba312238da2f20014654b6a.mockapi.io";

export const getAll = () =>
    axios.get(`${api}/ap/v1/records`);
export const create = (body) =>
    axios.post(`${api}/ap/v1/records`,body);
export  const update = (id,body) =>
    axios.put(`${api}/ap/v1/records/${id}`,body);
export const remove = (id) =>
    axios.delete(`${api}/ap/v1/records/${id}`);