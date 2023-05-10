const express = require('express')
const path = require('path')
const router = express.Router()
const controller = require('../controller/controller')

// Root client
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../views/home/home.html'))
})

router.get('/detail-restaurants', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../views/detail-restaurants/detail-restaurants.html'))
})

router.get('/infoRestaurants', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../views/infoRestaurants/infoRestaurant.html'))
})
router.get('/add-infoRes', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../views/add-infoRes/add-infoRes.html'))
})

router.get('/update-infoRes', (req, res) => {
    res.sendFile(path.join(__dirname + '../../../views/update-infoRes/update-infoRes.html'))
})


//API
router.get('/api/info', controller.getInfoRes)

router.get('/api/info/:id', controller.FindRes)

router.post('/api/info', controller.CreateRes)

router.put('/api/info/:id', controller.UpdateRes)

router.delete('/api/info/:id', controller.DeleteRes)
    


module.exports = router