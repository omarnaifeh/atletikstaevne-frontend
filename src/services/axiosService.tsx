import axios from "axios"

const AxiosService = () => {

    const instance = axios.create({
        baseURL: "http://localhost:8080/api",
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    })


    instance.interceptors.request.use(async (config) => {
        return config
    })

    instance.interceptors.response.use(
        response => {
            return response
        },
        error => {
            return Promise.reject(error)
        }
    )

    return instance

}

export default AxiosService