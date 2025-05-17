import { useState } from "react";
import Modal from "react-modal"
import { useAuth } from "../context/authContext";

const RestaurantModal = (props) => {
    const [restaurantPavadinimas, setRestaurantPavadinimas] = useState(props.restaurant ? props.restaurant.pavadinimas : '');
    const [restaurantAdresas, setRestaurantAdresas] = useState(props.restaurant ? props.restaurant.adresas : '');
    const [restaurantKodas, setRestaurantKodas] = useState(props.restaurant ? props.restaurant.kodas : '');
    const [restaurantSpecializacija, setRestaurantSpecializacija] = useState(props.restaurant ? props.restaurant.specializacija : '');
    const [modalIsOpen, setIsOpen] = useState(false);
    const {token} = useAuth()
    console.log(token)

    //this is just silly

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const restaurantData = {
                pavadinimas: restaurantPavadinimas,
                adresas: restaurantAdresas,
                kodas: restaurantKodas,
                specializacija: restaurantSpecializacija

            };
            //console.log(props.id);
            if (props.updateEndpoint) {
            await props.updateEndpoint(props.id, restaurantData, token);
            } else {
            await props.createEndpoint( restaurantData, token);
            }
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            location.reload()
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await props.deleteEndpoint(props.id, token)
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            location.reload()
        }
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
        padding: '0px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    };

    return (  <>
                <button className={props.className} onClick={toggleModal}>{props.title}</button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Example Modal"
                            style={customStyles}
                >
                    <div className="modal-content form-container shadow-none">
                        <h2>{props.title}</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Pavadinimas:
                                <input className="input" type="text" value={restaurantPavadinimas} onChange={(e) => setRestaurantPavadinimas(e.target.value)} required />
                            </label>
                            <label>
                                Adresas:
                                <input className="input" type="text" value={restaurantAdresas} onChange={(e) => setRestaurantAdresas(e.target.value) } required />
                            </label>
                            <label>
                                Kodas:
                                <input className="input" type="text" value={restaurantKodas} onChange={(e) => setRestaurantKodas(e.target.value)} required/>
                            </label>
                            <label>
                                Specializacija:
                                <input className="input" type="text" value={restaurantSpecializacija} onChange={(e) => setRestaurantSpecializacija(e.target.value)}/>
                            </label>
                            <div className="why the hell">
                                <button type="submit" className="btn btn-primary mt-2">{props.title}</button>
                                {props.deleteEndpoint && <button onClick={handleDelete} className="btn btn-primary mt-2">Trinti</button>}
                            </div>
                        </form>
                        <button className="btn mt-4 btn-secondary" onClick={toggleModal}>Close</button>
                    </div>
                </Modal>
            </>
    );
}

export default RestaurantModal;