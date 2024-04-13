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

interface LoginParams {
    email: string
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
    },
    getLoginParams: async (params: LoginParams) => {
        const res = await api.post('/auth/login', params).catch(error => {
            if (error.response.status = 400) {
                return error.response
            }
            return error
        })
        if (res.status === 200) {
            sessionStorage.setItem("onebitflix-token", res.data.token);
        }
        return res
    }
}

export default authService