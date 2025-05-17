const express = require('express')
const authRouter = require('./routes/authRoutes')
const restaurantRouter = require('./routes/restaurantRoutes')
const menuRouter = require('./routes/menuRoutes')
const itemRouter = require('./routes/itemRoutes')
const orderRouter = require('./routes/orderRoutes')


const app = express()
app.use(express.json())
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use('/api/v0/auth', authRouter)
app.use('/api/v0/restaurant', restaurantRouter)
app.use('/api/v0/menu', menuRouter)
app.use('/api/v0/item', itemRouter)
app.use('/api/v0/order', orderRouter)



module.exports = app