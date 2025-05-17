//kill me :/
import { Link } from "react-router-dom";
import RestaurantModal from "../modals/RestaurantModal";
const token = localStorage.getItem('jwtToken');

const RestaurantDetails = ({ restaurant, updateEndpoint, deleteEndpoint }) => {
    //console.log(restaurant._id)
    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{restaurant.pavadinimas}</h5>
                    <p className="card-text">
                        <strong>Kodas:</strong> {restaurant.kodas}<br />
                        <strong>Adresas:</strong> {restaurant.adresas}<br />
                        <strong>Specializacija:</strong> {restaurant.specializacija || 'Nėra reitingo'}<br />
                    </p>
                    <div className="card-actions">
                        <Link to={`/restaurant/${restaurant._id}`} className="btn btn-sm btn-primary">Peržiūrėti</Link>
                        {token &&                        
                        <RestaurantModal
                            title="Redaguoti"
                            updateEndpoint={updateEndpoint}
                            deleteEndpoint={deleteEndpoint}
                            className="btn btn-sm btn-secondary"
                            restaurant={restaurant}
                            id={restaurant._id}
                        />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantDetails;