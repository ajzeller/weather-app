import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import auth0 from '../../lib/auth0'
import fetch from 'isomorphic-unfetch'

const ObjectId = require('mongodb').ObjectID;

const handler = nextConnect()

handler.use(middleware)

handler.get( async (req, res) => {
  try{
    // GET lat, lon id from query

    const lat = req.query.lat
    const lon = req.query.lon

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`, {
      method: 'GET'
    })
    const json = await weather.json()

    return res.json(json)

  } catch(err){
    res.json(`Error: ${err}`)
  }
})

export default (req, res) => handler.apply(req, res)