const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri = "mongodb+srv://VolunteerNetworkUser:2DUVdpfbpVWNXCs7@cluster0.d0phw.mongodb.net/VolunteerNetwork?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const app = express()
app.use(bodyParser.json());
app.use(cors());


const port = 4000;


client.connect(err => {
  const collection = client.db("VolunteerNetwork").collection("VolunteerBd");
  console.log('data base connected');
const eventsCollection = client.db("VolunteerNetwork").collection("events");


app.post("/addVolunteerBd", (req, res) => {
        const VolunteerBd = req.body;
        collection.insertMany(VolunteerBd)
        .then(result => {
            res.send(result.insertedCount)
        })
    })

    app.get('/VolunteerBd', (req, res) => {
        collection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    app.get('/VolunteerBd/:id', (req, res) => {
        collection.find({id: req.params.id})
        .toArray((err, documents) => {
            res.send(documents[0]);
        })
    })

    app.post("/addEvents", (req, res) => {
        const events = req.body;
        eventsCollection.insertOne(events)
        .then(result => {
            res.status(100).send(result)
        })
    })

    app.get('/events', (req, res) => {
        const queryEmail = req.query.email;
        eventsCollection.find({email: queryEmail})
            .toArray((err, documents) => {
                res.send(documents);
        })
    })

    app.delete('/eventDelete/:id', (req, res) => {
        eventsCollection.deleteOne({id: req.params.id})
            .then(result => {
                res.send(result.deletedCount > 0);
        })
    })

    app.get('/allEvents', (req, res) => {
        eventsCollection.find({})
            .toArray((err, documents) => {
                res.send(documents);
        })
    })

    app.post("/createEvents", (req, res) => {
        const events = req.body;
        collection.insertOne(events)
            .then(result => {
                res.send(result.insertedCount)
            })
    })

    app.delete('/deleteUserEvent/:id', (req, res) => {
        eventsCollection.deleteOne({id: req.params.id})
            .then(result => {
                res.send(result.deletedCount > 0);
            })
    })

}); 



app.get('/', (req, res) => {
    res.send('mongodb!')
})

app.listen(4000)