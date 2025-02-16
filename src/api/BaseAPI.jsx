import axios from 'axios'

const apiTodos = axios.create({
    baseURL: "https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/"
})
export default apiTodos
