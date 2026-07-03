import axios from "axios"

export async function register({ username, email, password }) {
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, {
            username, email, password
        }, {
            withCredentials: true
        })

        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function login({ email, password }){
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/login`, {
            email, password
        }, {
            withCredentials: true
        })

        return response.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function logout(){
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try{
        const response = await axios.get(`${BASE_URL}/api/auth/logout`,{
            withCredentials:true})

        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}


export async function getMe(){
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    try{
        const response = await axios.get(`${BASE_URL}/api/auth/get-me`,{
            withCredentials:true
        })

        return response.data;
    }catch(err){
        console.log(err);
        throw err;
    }
}