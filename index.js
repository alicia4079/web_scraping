require('dotenv').config()
const objectRoutes = require('./src/api/routes/object')
const { connectDB } = require('./src/config/db')
const express = require('express')

const server = express()
connectDB()

server.use('/api/v1/objectStarWars', objectRoutes)

server.use('*', (req, res, next) => {
  return res.status(404).json('Route not found')
})

server.listen(3000, () => {
  console.log('http://localhost:3000')
})
