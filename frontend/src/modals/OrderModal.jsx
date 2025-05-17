import Modal from 'react-modal';
import { useState } from 'react';
import { useAuth } from '../context/authContext';
import { useOrder } from '../context/orderContext';

const OrderModal = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { token } = useAuth();
    const { createOrder } = useOrder();
    const [patiekalai, setPatiekalai] = useState('');
    const [kiekis, setKiekis] = useState(0);
    const [email, setEmail] = useState('');
    const [telNumeris, setTelNumeris] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        {
        try {
            const orderData = {
            patiekalai: patiekalai,
            kiekis: kiekis,
            email: email,
            telNumeris: telNumeris
        };
            await createOrder(orderData, token);
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            //location.reload();
        }};
    }

    const toggleModal = () => {
        setIsOpen(!modalIsOpen);
    };

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <div>
            <button onClick={toggleModal} className="btn btn-primary">
                {props.title}
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <h2>{props.title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="patiekalai">Patiekalai</label>
                        <input
                            type="text"
                            id="patiekalai"
                            value={patiekalai}
                            onChange={(e) => setPatiekalai(e.target.value)}
                            className="form-control"
                        />
                        <label htmlFor="kiekis">Kiekis</label>
                        <input
                            type="number"
                            id="kiekis"
                            value={kiekis}
                            onChange={(e) => setKiekis(e.target.value)}
                            className="form-control"
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                        />
                        <label htmlFor="telNumeris">Telefono Numeris</label>
                        <input
                            type="text"
                            id="telNumeris"
                            value={telNumeris}
                            onChange={(e) => setTelNumeris(e.target.value)}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <button onClick={toggleModal} className="btn btn-secondary">
                        Close
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default OrderModal;