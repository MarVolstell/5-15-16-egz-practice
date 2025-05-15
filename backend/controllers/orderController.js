const Order = require('../models/orderModel')

exports.getOrders = async (req, res) =>{
    try {
        const orders = await Order.find()
        res.status(200).json({
            status: "success",
            results: orders.length,
            data:{orders}
        })
    } catch (error) {
            res.status(400).json({
            status: 'failed',
            error: error.message
        })
    }
}


exports.createOrder = async (req, res)=>{
    try {
        const order = await Order.create(req.body)
            res.status(201).json({
            status: 'success',
            data: {order}
        })
    } catch (error) {
        res.status(401).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.changeOrderStatus = async (req, res)=>{
    try {
        const {statusas} = req.body
        if(statusas == "Patvirtinta" || statusas == "Atšaukta"){
            const order = await Order.findByIdAndUpdate(req.params.id, {statusas: statusas})
            res.status(200).json({
            status: 'success',
            data: {order}
        })

        }else return res.status(400).json({
            status: 'failed',
            error: "Status must be Patvirtinta or Atšaukta"
        })
        
    } catch (error) {
            res.status(401).json({
            status: 'failed',
            error: error.message
        })
    }
}