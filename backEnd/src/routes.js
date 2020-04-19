const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionsController = require('./controllers/SessionController')

const routes = express.Router()

routes.get('/ongs',OngController.index)
routes.post('/ongs',OngController.create)
routes.post('/incidents',IncidentController.create)
routes.get('/incidents',IncidentController.index)
routes.delete('/incidents/:id',IncidentController.delete)
routes.get('/profile', ProfileController.index)

routes.post('/session',SessionsController.create)


module.exports = routes