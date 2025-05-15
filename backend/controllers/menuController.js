const Restaurant = require('../models/restaurantModel')


exports.createMenu = async (req, res)=> {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, {$push:{
            meniu: {
                pavadinimas: req.body.pavadinimas
            }
        }}, {
            new:true,
            runValidators:true
        })

        await restaurant.save()
        res.status(201).json({
            status: 'success',
            data:{restaurant}
        })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.updateMenu = async (req, res)=> {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId)
        const menu = restaurant.meniu.id(req.params.menuId)

        menu.pavadinimas = req.body.pavadinimas

        await restaurant.save()
        res.status(200).json({
            status: 'success',
            data:{restaurant}
        })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.deleteMenu = async (req, res)=>{
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId)
        const menu = restaurant.meniu.id(req.params.menuId)

        menu.deleteOne()
        await restaurant.save()
        res.status(204).json({
            status: 'success',
            data: restaurant
        })
    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}