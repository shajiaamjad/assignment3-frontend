import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000", //backend requests was going to 3000 by default
});

export default api;
