import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import auth0 from '../../lib/auth0'
import fetch from 'isomorphic-unfetch'

const ObjectId = require('mongodb').ObjectID;

const handler = nextConnect()

handler.use(middleware)

handler.post( async (req, res) => {
  const { user } = await auth0.getSession(req)
  console.log(user)
  let data = req.body
  data = JSON.parse(data)

  let doc = await req.db.collection('users').insertOne(
    { ...user, inserted_on: new Date() })

  console.log(`successful update: ${user.nickname}`)
  
  return res.json('success')
})

handler.get( async (req, res) => {
  // const tokenCache = auth0.tokenCache(req, res);
  // const { accessToken } = await tokenCache.getAccessToken({
  //   scopes: ['read:shows']
  // });
  // console.log(accessToken)

  // const { user } = await auth0.getSession(req)
  // console.log(user)
  
  // get location id from query

  const lat = req.query.lat
  const lon = req.query.lon

  const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.API_KEY}`, {
    method: 'GET'
  })
  const json = await weather.json()

  return res.json(json)
  // return res.json({sub: user.sub})

  // let doc = await req.db.collection('todos').find({}).toArray()
  // console.log(doc)
  // return res.json(doc)
})

handler.delete( async (req, res) => {
  let data = req.body
  data = JSON.parse(data)
  let idToDelete = data._id
  console.log(data)

  if(ObjectId.isValid(idToDelete)){
    idToDelete = ObjectId(idToDelete)
  } else {
    return res.json(`could not delete ${idToDelete}`)
  }

  let doc = await req.db.collection('todos').deleteOne({ _id: idToDelete})
  // console.log(doc)
  return res.json('success')
})

handler.put( async (req, res) => {
  let data = req.body
  data = JSON.parse(data)
  let idToUpdate = data._id
  console.log(data)

  if(ObjectId.isValid(idToUpdate)){
    idToUpdate = ObjectId(idToUpdate)
  } else {
    return res.json(`could not Update ${idToDelete}`)
  }

  let doc = await req.db.collection('todos').updateOne(
    {_id: idToUpdate}, 
    {$set: { modified: new Date(), isChecked: !data.isChecked }})
  return res.json('success')
})

export default (req, res) => handler.apply(req, res)