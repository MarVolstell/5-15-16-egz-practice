import { useNavigate, useParams } from "react-router";
import { useRestaurant } from "../context/restaurantContext";
import { useItem } from "../context/itemContext";
import { useState, useEffect } from "react";
import ItemInputModal from "../modals/ItemInputModal";
import MenuModal from "../modals/MenuModal";
import { useMenu } from "../context/menuContext";
import { useAuth } from "../context/authContext";

const Meniu = ()=>{
        const { getRestaurantById } = useRestaurant();
        const id = useParams()
        //console.log(id)
        const [restaurant, setRestaurant] = useState([])
        const navigate = useNavigate()
        const [error, setError] = useState(null)
        const {updateItem, deleteItem, createItem} = useItem()
        const {createMenu, updateMenu, deleteMenu} = useMenu()
        const token = localStorage.getItem('jwtToken');
    
        const fetchRestaurant = async()=>{
            setError(null);
            try {
                const data = await getRestaurantById(id.id);
                setRestaurant(data.meniu);
                console.log(restaurant)
            } catch (err) {
                setError(`Klaida: ${err.message}`);
            }
        }

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const menuData = {
                    pavadinimas: e.target[0].value,
                };
                await createMenu(id.id, menuData);
                
            } catch (error) {
                console.error('Error creating item:', error);
                setError('Klaida: ' + error.message);
            } finally {
                location.reload()
            }
        }
        
       useEffect(() => {fetchRestaurant()}, [navigate])
    

    return(
        <div className="main-content">
                    <div className="container-flex p-5">
                        {token && 
                        <form onSubmit={handleSubmit} className="d-flex form-container mb-3 mt-0">
                            <input className="input mb-0" type="text" placeholder="Įveskit pavadinimą"/>
                            <button type="submit" className="btn btn-primary ">Kurti</button>
                        </form>}

                        {restaurant.map((meniu)=>{
                            return(
                            <div className="col">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title meniu">{meniu.pavadinimas || 'Be pavadinimo'}</h5>
                                    {meniu.patiekalai.map((item)=>{
                                        return(
                                    <div className="card-text patiekalas">
                                        <strong className="strong">{item.pavadinimas}</strong> <p className="w-10">{item.aprašymas || 'Nėra aprašymo'}</p>
                                        <div className="image">
                                            {item.nuotrauka && <img src={item.nuotrauka} alt={item.nuotrauka} />}
                                        </div>
                                        {token &&                                         
                                        <ItemInputModal
                                            title="Redaguoti"
                                            updateEndpoint={updateItem}
                                            deleteEndpoint={deleteItem}
                                            className="btn btn-sm btn-secondary"
                                            restaurantId={id.id}
                                            meniuId={meniu._id}
                                            itemId={item._id}
                                        />}

                                    </div>
                                        )
                                    })}
                                    {token &&
                                    <div className="card-actions d-flex justify-content-between">
                                            <div className="add-item mt-3">
                                                <ItemInputModal
                                                title="Pridėti"
                                                createEndpoint={createItem}
                                                className="btn btn-sm btn-secondary"
                                                restaurantId={id.id}
                                                meniuId={meniu._id}
                                            />
                                            </div>
                                        <div className="menu-buttons mt-3">
                                            <MenuModal
                                                title="Redaguoti"
                                                updateEndpoint={updateMenu}
                                                restaurantId={id.id}
                                                meniuId={meniu._id}
                                                deleteEndpoint={deleteMenu}
                                                className="btn btn-sm btn-primary"
                                            />
                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>)
                        })}
                    </div>
                </div>
    )
}

export default Meniu