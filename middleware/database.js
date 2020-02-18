import { MongoClient } from 'mongodb'
import nextConnect from 'next-connect'

const client = new MongoClient(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

async function database(req, res, next) {
  try {
    if (!client.isConnected()) await client.connect()
    req.dbClient = client
    req.db = client.db(process.env.DATABASE_NAME)
    return next()
  } catch(err){
    alert(err)
  }
}

const middleware = nextConnect()

middleware.use(database)

export default middleware