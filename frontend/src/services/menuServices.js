import fetchRequest from "../utilities/authUtilities";

export const createMenu = async (restaurantId, menuData, token) => {
    return fetchRequest(`/menu/${restaurantId}`, { method: 'POST', body: JSON.stringify(menuData) }, token);
}

export const updateMenu = async (restaurantId, menuId, menuData, token) => {
    return fetchRequest(`/menu/${restaurantId}/${menuId}`, { method: 'PATCH', body: JSON.stringify(menuData) }, token);
}

export const deleteMenu = async (restaurantId, menuId, token) => {
    await fetchRequest(`/menu/${restaurantId}/${menuId}`, { method: 'DELETE' }, token);
    return null
}
