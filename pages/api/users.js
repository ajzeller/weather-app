import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import auth0 from '../../lib/auth0'
import fetch from 'isomorphic-unfetch'

const ObjectId = require('mongodb').ObjectID;

const handler = nextConnect()

handler.use(middleware)

// POST upsert user/location
handler.post( async (req, res) => {
  try{
    const { user } = await auth0.getSession(req)
    console.log(user)
    let data = req.body
    data = JSON.parse(data)
    console.log(data)
  
    let doc = await req.db.collection('users').updateOne( 
      {sub: user.sub },
      { $setOnInsert: { 
          ...user,
          inserted_on: new Date() }, 
        $set: {
          modified_on: new Date(),
        },
        $push: { weather: data}
      },
      {upsert: true })
  
    console.log(`successful update: ${user.nickname}`)
    
    return res.json('success')

  } catch(err) {
    return res.json(`Error: ${err}`)
  }
  
})

// GET all locations from user
handler.get( async (req, res) => {
  try{
    const { user } = await auth0.getSession(req)
    let doc = await req.db.collection('users').find({sub: user.sub}).toArray()
    console.log(doc[0].weather)
    return res.json(doc)

  } catch(err){
    return res.json(`Error: ${err}`)
  }
})

// DELETE location from array
handler.delete( async (req, res) => {
  try{
    const { user } = await auth0.getSession(req)

    let data = req.body
    data = JSON.parse(data)
    let idToDelete = data.id
    console.log(data)
  
    let doc = await req.db.collection('users').updateOne(
      { sub: user.sub},
      { $pull: { weather: { geoId: idToDelete } } })
    // console.log(doc)
    return res.json('success')
  } catch(err) {
    return res.json(`Error: ${err}`)
  }
})

// PUT 
handler.put( async (req, res) => {
  try{
    const { user } = await auth0.getSession(req)

    let data = req.body
    data = JSON.parse(data)
    let idToUpdate = data.id
    console.log(data)
  
    let clearAllIsDefault = await req.db.collection('users').updateOne(
      {sub: user.sub}, 
      {$set: {"weather.$[].isDefault": false } })
  
    let setOneIsDefault = await req.db.collection('users').updateOne(
      {sub: user.sub}, 
      {$set: {"weather.$[elem].isDefault": true } },
      {arrayFilters: [ { "elem.geoId": { $eq: idToUpdate } }  ] } )
      
      // console.log(clearAllIsDefault)
      // console.log(setOneIsDefault)

    return res.json('success')

  } catch(err){
    return res.json(`Error: ${err}`)
  }
})

export default (req, res) => handler.apply(req, res)