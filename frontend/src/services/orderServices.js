import fetchRequest from "../utilities/authUtilities";

export const getOrders = async (token) => {
    const res = await fetchRequest(`/order`, { method: 'GET' }, token);
    return res.data.orders;
}
export const getOrderById = async (id, token) => {
    const res = await fetchRequest(`/order/${id}`, { method: 'GET' }, token);
    return res.data.orders;
}
export const createOrder = async (orderData) => {
    return fetchRequest('/order', { method: 'POST', body: JSON.stringify(orderData)});
}
export const changeOrderStatus = async (id, statusas, token) => {
    return fetchRequest(`/order/${id}`, { method: 'PATCH', body: JSON.stringify(statusas) }, token);
}