import { createContext, useContext } from "react";
import * as menuServices from "../services/menuServices";
import {useAuth} from "./authContext" 

const MenuContext = createContext()

export const MenuProvider = ({children})=>{
    const {token} = useAuth()
    
    const createMenu = async(restaurantId, menuData)=>{
        const res = await menuServices.createMenu(restaurantId, menuData, token)
    }

    const updateMenu = async(restaurantId, menuId, menuData)=>{
        const res = await menuServices.updateMenu(restaurantId, menuId, menuData, token)
    }

    const deleteMenu = async(restaurantId, menuId)=>{
        const res = await menuServices.deleteMenu(restaurantId, menuId, token)
    }

    return(
        <MenuContext.Provider value={{
            createMenu,
            updateMenu,
            deleteMenu
        }}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenu = ()=>{
    const context = useContext(MenuContext)
    if(!context) {
        throw new Error("can this even happen? apperently it can")
    }
    return context
}