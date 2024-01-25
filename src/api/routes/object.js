const { insertManyObjects, getAllObjects } = require('../controllers/object')

const objectRoutes = require('express').Router()

objectRoutes.post('/conseguir_cositas_Star_Wars', insertManyObjects)
objectRoutes.get('/', getAllObjects)

module.exports = objectRoutes
