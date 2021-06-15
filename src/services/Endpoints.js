import axios from "axios";


const getToken = () => localStorage.getItem("TOKEN_KEY");


const httpClient = axios.create({ 
  baseURL: "https://projeto-integrador-4.herokuapp.com/"
  
  
});

httpClient.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 

console.log("end "+getToken())
export const getAll = (entity) => {
  getToken();
  console.log("End getAll= "+localStorage.getItem("TOKEN_KEY"))      
  return httpClient.get(entity);
};

export const get = (entity_id) => {
  return httpClient.get(entity_id);
};

export const create =( entity, data) => {
  getToken();
  return httpClient.post(entity, data);
};

export const update = (entity_id, data) => {
  return httpClient.put(entity_id, data);
};

export const remove = entity_id=> {
  return httpClient.delete(entity_id);
};

