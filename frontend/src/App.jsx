import { AuthProvider } from "./context/authContext"
import { RestaurantProvider } from "./context/restaurantContext"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import './styles/base/global.css'
import Register from "./pages/Register"
import Restaurants from "./pages/Restaurants"
import Header from "./components/header"
import Meniu from "./pages/Menu"
import Orders from "./pages/Orders"
import { ItemProvider } from "./context/itemContext"
import { MenuProvider } from "./context/menuContext"
import { OrderProvider} from "./context/orderContext"


function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <OrderProvider>
        <MenuProvider>
          <ItemProvider>
            <Router>
              <div className="app-container">
                <Header/>
                <main className="content">
                  <Routes>
                      <Route path="/" element={<Restaurants/>}/>
                      <Route path="/orders" element={<Orders/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/register" element={<Register/>}/>
                      <Route path="/restaurant/:id" element={<Meniu/>}/>
                  </Routes>
                </main>
              </div>
            </Router>
          </ItemProvider>
        </MenuProvider>
        </OrderProvider>
      </RestaurantProvider>      
    </AuthProvider>
  )
}

export default App
