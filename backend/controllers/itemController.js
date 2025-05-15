const Restaurant = require('../models/restaurantModel')

exports.createItem = async (req, res)=>{
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId)
        const menu = restaurant.meniu.id(req.params.menuId)
        console.log(menu)
        menu.patiekalai.push(req.body)

        await restaurant.save()

        res.status(201).json({
            status:'success',
            data: {menu}
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.updateItem = async (req, res)=> {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId)
        const menu = restaurant.meniu.id(req.params.menuId)
        const item = menu.patiekalai.id(req.params.itemId)

        item.pavadinimas = req.body.pavadinimas
        item.aprašymas = req.body.aprašymas
        item.nuotrauka = req.body.nuotrauka

        await restaurant.save()
        res.status(201).json({
            status: 'success',
            data:{menu}
        })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}

exports.deleteItem = async (req, res)=> {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId)
        const menu = restaurant.meniu.id(req.params.menuId)
        const item = menu.patiekalai.id(req.params.itemId)

        item.deleteOne()

        await restaurant.save()
        res.status(200).json({
            status: 'success',
            data:{menu}
        })

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            error: error.message
        })
    }
}
