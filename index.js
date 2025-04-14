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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
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

        const database = client.db("yourDatabaseName");
        const collection = database.collection("yourCollectionName");

    } catch (error) {
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


