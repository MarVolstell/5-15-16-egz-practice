import { createContext, useContext } from "react";
import * as itemServices from "../services/itemServices";
import {useAuth} from "./authContext"

const ItemContext = createContext()

export const ItemProvider = ({children})=>{
    const {token} = useAuth()
    
    const createItem = async(restaurantId, menuId, itemData)=>{
        const res = await itemServices.createItem(restaurantId, menuId, itemData, token)
    }

    const updateItem = async(restaurantId, menuId, itemId, itemData)=>{
        const res = await itemServices.updateItem(restaurantId, menuId, itemId, itemData, token)
    }

    const deleteItem = async(restaurantId, menuId, itemId)=>{
        const res = await itemServices.deleteItem(restaurantId, menuId, itemId, token)
    }

    return(
        <ItemContext.Provider value={{
            createItem,
            updateItem,
            deleteItem
        }}>
            {children}
        </ItemContext.Provider>
    )
}

export const useItem = ()=>{
    const context = useContext(ItemContext)

        if(!context) {
        throw new Error("can this even happen?")
    }
    return context
}