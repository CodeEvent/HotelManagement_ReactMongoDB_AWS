const express = require('express');
const route = express.Router()

const services = require('../services/render');



route.get('/', services.homeRoutes);



route.get('/add_guest', services.add_guest)


route.get('/update_guest', services.update_guest)



module.exports = route