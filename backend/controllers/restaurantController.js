const Restaurant = require('../models/restaurantModel')

exports.getRestaurants = async (req, res)=>{
    try {
        const restaurants = await Restaurant.find()

        res.status(200).json({
            status: 'success',
            results: restaurants.length,
            data: {restaurants}
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.getRestaurant = async (req, res)=>{
    try {
        const restaurants = await Restaurant.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {restaurants}
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.createRestaurant = async (req, res)=>{
    try {
        const restaurant = await Restaurant.create(req.body)
            res.status(200).json({
            status: 'success',
            data: {restaurant}
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.updateRestaurant = async (req, res)=>{
        try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
            res.status(200).json({
            status: 'success',
            data: {restaurant}
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.deleteRestaurant = async (req, res)=>{
        try {
        await Restaurant.findByIdAndDelete(req.params.id);
            res.status(200).json({
            status: 'success',
            data: null
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

