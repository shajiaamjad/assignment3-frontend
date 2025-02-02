import axios from "axios";

const api = axios.create({
    baseURL: "https://assignment3-backend-mu.vercel.app", //backend requests was going to 3000 by default
});

export default api;
