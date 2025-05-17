import { useState } from "react";
import Modal from "react-modal"
import { useAuth } from "../context/authContext";

const ItemInputModal = (props) => {
    const [itemPavadinimas, setitemPavadinimas] = useState('');
    const [itemAprašymas, setitemAprašymas] = useState('');
    const [itemNuotrauka, setitemNuotrauka] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const {token} = useAuth()
    console.log(token)

    //godDamn
    //damnGod123

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const itemData = {
                pavadinimas: itemPavadinimas,
                aprašymas: itemAprašymas,
                nuotrauka: itemNuotrauka,

            };
            console.log(props.itemId);
            if (props.updateEndpoint) {
            await props.updateEndpoint(props.restaurantId, props.meniuId, props.itemId, itemData, token);
            } else {
            await props.createEndpoint(props.restaurantId, props.meniuId, itemData, token);
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
            await props.deleteEndpoint(props.restaurantId, props.meniuId, props.itemId, token)
        } catch (error) {
            console.error('Error creating item:', error);
        } finally {
            location.reload()
        }
    }

    const toggleModal = () => {
         setIsOpen(!modalIsOpen);
    };
    

    //you can do probably do this with a css file but this was how it was done in the documentation
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
                                <input className="input" type="text" value={itemPavadinimas} onChange={(e) => setitemPavadinimas(e.target.value)} />
                            </label>
                            <label>
                                Aprašymas:
                                <input className="input" type="text" value={itemAprašymas} onChange={(e) => setitemAprašymas(e.target.value)} />
                            </label>
                            <label>
                                Nuotrauka:
                                <input className="input" type="text" value={itemNuotrauka} onChange={(e) => setitemNuotrauka(e.target.value)}/>
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

export default ItemInputModal;