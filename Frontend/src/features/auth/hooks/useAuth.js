import { useContext } from "react";

import { AuthContext } from "../auth.context";
import { login, register,getMe,logout } from "../services/auth.services";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user, setUser , loading , setLoading} = context



    const handleLogin = async ({email,password}) => {

        try{
        setLoading(true)

        const data = await login({email,password})

        setUser(data.user)
        }catch(e){
            console.log(e)
            throw e
        }finally{
            setLoading(false)
        }
    }

    const handleRegister = async ({username,email,password}) => {

        try{
        setLoading(true)
        const data = await register({username,password,email})
        setUser(data.user)
        }catch(e){
            console.log(e)
            throw e
        }finally{
            setLoading(false)
        }
    }

    const handleLogout = async()=>{
        try{
        setLoading(true)
        const data = await logout()
        setUser(null)
        }catch(e){
            console.log(e)
            throw e
        }finally{
            setLoading(false)
        }
    }


    return {user,loading,handleLogin,handleLogout,handleRegister}
}