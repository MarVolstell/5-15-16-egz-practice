import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import RestaurantDetails from '../components/RestaurantDetails';
import { useRestaurant } from '../context/restaurantContext';
import RestaurantModal from '../modals/RestaurantModal';
const token = localStorage.getItem('jwtToken')


function Restaurants() {
    const { getRestaurants, createRestaurant, updateRestaurant, deleteRestaurant } = useRestaurant();
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);


    const fetchRestaurants = async()=>{
        setError(null);
        try {
            const data = await getRestaurants();
            setRestaurants(data);
            console.log(restaurants)
        } catch (err) {
            setError(`Klaida: ${err.message}`);
    }
    }
   useEffect(() => {fetchRestaurants()}, [navigate])

    return(
            <div className="main-content">
                <div className="container-fluid p-5 pt-3">
                    {token &&
                    <RestaurantModal
                        title="Kurti naują restoraną"
                        createEndpoint={createRestaurant}
                        className="btn btn-secondary mb-3"
                    />} 
                    <h1 className="title">Restoranų sąrašas</h1>
                    {restaurants.length > 0 ? (
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                            {restaurants.map((restaurant) => (
                                <RestaurantDetails
                                    key={restaurant._id}
                                    restaurant={restaurant}
                                    updateEndpoint={updateRestaurant}
                                    deleteEndpoint={deleteRestaurant}
                                />
                            ))}
                        </div>
                    ) : (
                        <p>Nėra viešbučių.</p>
                    )}
                </div>
            </div>
        )
}

export default Restaurants