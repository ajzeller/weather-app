import nextConnect from 'next-connect'
import middleware from '../../middleware/database'
import auth0 from '../../lib/auth0'

const ObjectId = require('mongodb').ObjectID;

const handler = nextConnect()

handler.use(middleware)

handler.post( async (req, res) => {
  try {
    let data = req.body
    data = JSON.parse(data)

    const { user } = await auth0.getSession(req)
    console.log(user)

    let doc = await req.db.collection('todos').insertOne(
      { text: data.text,
        modified: new Date(),
        isChecked: false,
        author: user.sub
      })
    console.log(`successful update: ${data.text}`)
    
    return res.json('success')
  } catch(err) {
    return res.json(err)
  }
})

handler.get( async (req, res) => {
  try {
    const { user } = await auth0.getSession(req)
    console.log(user.sub)
    let doc = await req.db.collection('todos').find({author: user.sub}).toArray()
    console.log(doc)
    return res.json(doc)
  } catch(err){
    return(res.json(err))
  }
})

handler.delete( async (req, res) => {
  try {
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
  } catch(err){
    return(res.json(err))
  }
})

handler.put( async (req, res) => {
  try {
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
  } catch(err) {
    return(res.json(err))
  }
  
})

export default (req, res) => handler.apply(req, res)