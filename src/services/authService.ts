import { error } from "console"
import api from "./api"

interface RegisterParams {
    firstName: string
    lastName: string
    phone: string
    email: string
    birth: string
    password: string
}

const authService = {
    getRegisterParams: async (params: RegisterParams) => {
        const res = await api.post('/auth/register', params).catch(error => {
            if (error.response.status === 400) {
                return error.response
            }
            return error
        })
        return res
    }
}

export default authService