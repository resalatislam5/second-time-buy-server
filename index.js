const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@grover-grocery.gqn8qjj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function  run() {
    try{
        const productCollection = client.db('SecondTimeBuy').collection('Products')
        //all products
        app.get('/products',async(req,res)=>{
            const query = {};
            const products = await productCollection.find(query).toArray()
            res.send(products)
        })
        // id load product
        app.get('/products/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const product = await productCollection.findOne(query)
            res.send(product)
        })
        //electric bikes
        app.get('/electirc-bikes',async(req,res)=>{
            const query = {'categoryname' : 'Electirc Bikes'};
            const electircBike = await productCollection.find(query).toArray()
            res.send(electircBike)
        })
        //microbus
        app.get('/microbus',async(req,res)=>{
            const query = {'categoryname' : 'Microbus'};
            const microbus = await productCollection.find(query).toArray()
            res.send(microbus)
        })
        //Luxury Car
        app.get('/luxury-car',async(req,res)=>{
            const query = {'categoryname' : 'Luxury Car'};
            const luxuryCar = await productCollection.find(query).toArray()
            res.send(luxuryCar)
        })
    }
    finally{

    }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('SecondTimeBye server running ...')
})

app.listen(port,()=>{
    console.log(`SecondTimeBye server running on ${port}`)
})