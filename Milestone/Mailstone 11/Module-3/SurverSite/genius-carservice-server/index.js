const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000

//MiddleWore 
app.use(cors())
app.use(express.json())
//Connect Mongo 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ga5wb97.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        const ServiceCollection = client.db('genius-car').collection('service')
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = ServiceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await ServiceCollection.findOne(query);
            res.send(service)
        })

        // Post 

        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await ServiceCollection.insertOne(newService)
            res.send(result)
        })
        //delete
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await ServiceCollection.deleteOne(query)
            res.send(result)

        })
    }
    finally {

    }
}
run().catch(console.dir)



app.get('/', (req, res) => {
    res.send('I am from Express')
})
app.listen(port, () => {
    console.log('Cholsay gari Jatrabari ', port);
})