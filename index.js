const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import body-parser module
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Set the limit to a suitable value for your application

// Create a MongoDB client
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tanha:YSEtNvYe0gQlvlNP@cluster1.sv1owis.mongodb.net/?retryWrites=true&w=majority";

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
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    const database = client.db("insertDB");
    const haiku = database.collection("haiku");

    

    app.post('/upload', async (req, res) => {
        // Handle your upload route here
        const user = req.body;
        console.log('new user', user);
        const result = await haiku.insertOne(user);
        res.json({ status: 'success' }); // Respond to the client
      });
      

    app.get('/upload',async(req,res)=>{
        const cursor=haiku.find();
        const result=await cursor.toArray();
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Your routes and other middleware come here

app.get('/', (req, res) => {
  res.send('This is life');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});
