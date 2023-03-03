import axios from "axios"

const api = axios.create({
    baseURL : "https://keep-flux.herokuapp.com/"
})
export default api