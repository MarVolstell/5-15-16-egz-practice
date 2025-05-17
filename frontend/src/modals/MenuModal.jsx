import Modal from "react-modal";
import { useAuth } from "../context/authContext";
import { useState } from "react";

const MenuModal = (props)=>{
    const {token} = useAuth()
    const [menuPavadinimas, setMenuPavadinimas] = useState()
    const [modalIsOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const menuData = {
                pavadinimas: menuPavadinimas,
            };
            if (props.updateEndpoint) {
                await props.updateEndpoint(props.restaurantId, props.meniuId, menuData, token);
            } else {
                await props.createEndpoint(props.restaurantId, menuData, token);
            }
        } catch (error) {
            console.error('Error creating menu:', error);
        } finally {
            location.reload()
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await props.deleteEndpoint(props.restaurantId, props.meniuId, token)
        } catch (error) {
            console.error('Error creating menu:', error);
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
    
    return(
        <>
            <button className={props.className} onClick={toggleModal}>{props.title}</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={toggleModal}
                contentLabel="Example Modal"
                style={customStyles}>
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center form-container shadow-none">
                        <h2>{props.title}</h2>
                        <input type="text" className="input" value={menuPavadinimas} onChange={(e) => setMenuPavadinimas(e.target.value)}/>
                        <div className="d-flex">
                            <button className="btn btn-primary mt-2" type="submit">{props.title}</button>
                            <button className="btn btn-primary mt-2" onClick={handleDelete}>Ištrinti</button>
                        </div>
                        <button className="btn mt-4 btn-secondary" onClick={toggleModal}>Close</button>
                    </form>
            </Modal>
        </>
    )
}

export default MenuModal