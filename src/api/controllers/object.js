const Object = require('../models/Object')
const objectStarWars = require('../../../objectStarWars.json')

const insertManyObjects = async (req, res, next) => {
  try {
    await Object.insertMany(objectStarWars)
    return res.status(201).json('Todos los objectos se han subido a la BBDD🫶')
  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
}

const getAllObjects = async (req, res, next) => {
  try {
    const allObjects = await Object.find()
    return res.status(200).json(allObjects)
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = { insertManyObjects, getAllObjects }
