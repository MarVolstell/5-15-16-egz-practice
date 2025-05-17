import fetchRequest from "../utilities/authUtilities";

export const getRestaurants = async()=>{
    const res = await fetchRequest(`/restaurant`, {method: 'GET'})
    return res.data.restaurants
}

export const getRestaurantById = async (id, token)=>{
    const res = await fetchRequest(`/restaurant/${id}`, {method: 'GET'}, token)
    return res.data.restaurants
}

export const createRestaurant = async (restaurantData, token) => {
    return fetchRequest('/restaurant', { method: 'POST', body: JSON.stringify(restaurantData) }, token);
}
 
export const updateRestaurant = async (id, restaurantData, token) => {
    return fetchRequest(`/restaurant/${id}`, { method: 'PATCH', body: JSON.stringify(restaurantData) }, token);
}
 
export const deleteRestaurant = async (id, token) => {
    await fetchRequest(`/restaurant/${id}`, { method: 'DELETE' }, token);
    return null
}