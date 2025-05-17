import { createContext, useContext } from "react";
import * as orderServices from "../services/orderServices";
import {useAuth} from "./authContext" 

const OrderContext = createContext()

export const OrderProvider = ({children})=>{
        const {token} = useAuth()
        //console.log(token)
    
        const getOrders = async ()=>{
            const orders = await orderServices.getOrders(token)
            console.log(orders)
            return orders?.map(order =>({
                ...order,
                id:order.id
            }))
        }
        const createOrder = async (orderData)=>{
            const response = await orderServices.createOrder(orderData)

            console.log(response)
        }

        const changeOrderStatus = async(id, statusas)=>{
            console.log(id)
            const response = await orderServices.changeOrderStatus(id, statusas, token)

            console.log(response)
        }

        return(
            <OrderContext.Provider value={{
                getOrders,
                createOrder,
                changeOrderStatus
            }}>
                {children}
            </OrderContext.Provider>
        )
}

export const useOrder = ()=>{
    const context = useContext(OrderContext)

    if(!context) {
        throw new Error("somethings gomne wrong with the useOrder context")
    }

    return context
}