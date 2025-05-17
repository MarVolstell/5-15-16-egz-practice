import { createContext, useContext, useEffect, useState } from "react";
import * as authServices from "../services/authServices"

const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [token, setToken] = useState(()=> localStorage.getItem('jwtToken'))
    console.log(token)
    useEffect(()=>{
        if(token){
            localStorage.setItem("jwtToken", token)
        }
        else{
            localStorage.removeItem("jwtToken")
        }
    }, [token])

    const getResponse = async (response)=>{
        const data = await response
        if(data?.token){
            setToken(data.token)
        }
    }
//?
    const login = async (email, password)=>{
        return getResponse(authServices.login(email, password))
    }
    
    const logout = ()=>{
        setToken(null)
        authServices.logout()
    }
    
    const createUser = async (userData)=>{
        return getResponse(authServices.createUser(userData))
    }

    return (
        <AuthContext.Provider value={{
            token,
            setToken,
            login,
            logout,
            createUser,
            getResponse
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    if(!context){
        throw new Error ('useAuth turi buti naudojamas su AuthProvider')
    }

    return context
}