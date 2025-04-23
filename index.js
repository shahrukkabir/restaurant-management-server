const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wi4y4.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const menuCollection = client.db("restaurant_manage").collection("menu");
        const reviewCollection = client.db("restaurant_manage").collection("reviews");
        const cartCollection = client.db("restaurant_manage").collection("carts");

        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray();
            res.send(result);
        })
        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray();
            res.send(result);
        })

        //carts collection
        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        })

        app.get('/carts', async (req, res) => {
            const result = await cartCollection.find().toArray();
            res.send(result);
        })

    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run();
app.get('/', (req, res) => {
    res.send('Server is up and running!');
});

// Common log message for server start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


