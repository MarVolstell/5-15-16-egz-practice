import fetchRequest from "../utilities/authUtilities";

export const createItem = async (restaurantId, menuId, itemData, token) => {
    return fetchRequest(`/item/${restaurantId}/${menuId}`, { method: 'POST', body: JSON.stringify(itemData) }, token);
}
 
export const updateItem = async (restaurantId, menuId, itemId, itemData, token) => {
    return fetchRequest(`/item/${restaurantId}/${menuId}/${itemId}`, { method: 'PATCH', body: JSON.stringify(itemData) }, token);
}
 
export const deleteItem = async (restaurantId, menuId, itemId, token) => {
    await fetchRequest(`/item/${restaurantId}/${menuId}/${itemId}`, { method: 'DELETE' }, token);
    return null
}