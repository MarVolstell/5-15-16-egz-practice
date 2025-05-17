import { createContext, useContext } from "react";
import * as restaurantServices from "../services/restaurantServices";
import {useAuth} from "./authContext"

const RestaurantContext = createContext()

export const RestaurantProvider = ({children}) =>{
    const {token} = useAuth()
    console.log(token)

    const getRestaurants = async ()=>{
        const restaurants = await restaurantServices.getRestaurants()
        console.log(restaurants)
        return restaurants?.map(restaurant =>({
            ...restaurant,
            id:restaurant.id
        }))
    }

    const getRestaurantById = async (id)=>{
        //console.log(id)
        const response = await restaurantServices.getRestaurantById(id)

        const restaurant = response || null
        console.log(restaurant)

        return restaurant ? {...restaurant, id:restaurant.id} : null
    }

    const createRestaurant = async (restaurantData)=>{
        const response = await restaurantServices.createRestaurant(restaurantData, token)

        console.log(response)
    }

    const updateRestaurant = async(id, restaurantData)=>{
        console.log(id)
        const response = await restaurantServices.updateRestaurant(id, restaurantData, token)

        console.log(response)
    }

    const deleteRestaurant = async (id) => {
        await restaurantServices.deleteRestaurant(id, token)
    }

    return(
        <RestaurantContext.Provider value={{
            getRestaurants,
            getRestaurantById,
            createRestaurant,
            updateRestaurant,
            deleteRestaurant
        }}>
            {children}
        </RestaurantContext.Provider>
    )
}

export const useRestaurant = ()=>{
    const context = useContext(RestaurantContext)

    if(!context) {
        throw new Error("use restaurant turi but naudiohamos su restaueant provider")
    }

    return context
}

//?