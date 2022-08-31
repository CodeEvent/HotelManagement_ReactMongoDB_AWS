const express = require('express');
const route = express.Router()

const services = require('../services/render');

const controller = require('../controller/controller');

route.get('/', services.homeRoutes);



route.get('/add_guest', services.add_guest)


route.get('/update_guest', services.update_guest)


// api route
route.post('/api/guests', controller.create);
route.get('/api/guests', controller.find);
route.put('/api/guests/:id', controller.update);
route.delete('/api/guests/:id', controller.delete);


module.exports = route