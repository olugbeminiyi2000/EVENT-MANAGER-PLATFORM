import axios from "axios";
/*
    create a new instance of the axios class
    using this axios object called userAxios
    an export it out
*/
const userAxios = axios.create({
    baseURL: "http://localhost:3500",
})

export default userAxios;