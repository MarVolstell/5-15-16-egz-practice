import { useState, useEffect } from 'react';
import { useOrder } from '../context/orderContext';

function Orders() {
    const { getOrders, changeOrderStatus } = useOrder();
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        setError(null);
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err) {
            setError(`Klaida: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, statusas) => {
        try {
            await changeOrderStatus(orderId, { statusas });
            fetchOrders();
        } catch (err) {
            setError(`Klaida: ${err.message}`);
        }
    };

    return (
        <div className="main-content">
            <div className="container-fluid p-5 pt-3">
                <h1 className="title">Užsakymų sąrašas</h1>
                {error && <p className="error">{error}</p>}
                {orders.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {orders.map((order) => (
                            <div className="col" key={order._id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Užsakymas #{order._id}</h5>
                                        <p className="card-text">
                                            <strong>Patiekalai:</strong> {order.patiekalai.join(', ')}<br />
                                            <strong>Kiekiai:</strong> {order.kiekis.join(', ')}<br />
                                            <strong>El. paštas:</strong> {order.email}<br />
                                            <strong>Tel. numeris:</strong> {order.telNumeris}<br />
                                            <strong>Statusas:</strong> {order.statusas}
                                        </p>
                                        <div className="card-actions">
                                            {order.statusas === "Laukiama" && (
                                                <>
                                                    <button
                                                        className="btn btn-sm btn-success me-2"
                                                        onClick={() => handleStatusChange(order._id, "Patvirtinta")}
                                                    >
                                                        Patvirtinti
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => handleStatusChange(order._id, "Atšaukta")}
                                                    >
                                                        Atšaukti
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Nėra užsakymų.</p>
                )}
            </div>
        </div>
    );
}

export default Orders;