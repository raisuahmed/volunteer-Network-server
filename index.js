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
 


app.post("/addOrganizations", (req, res) => {
        const organizations = req.body;
        organizationsCollection.insertMany(organizations)
        .then(result => {
            res.send(result.insertedCount)
        })
    })

    app.get('/organizations', (req, res) => {
        organizationsCollection.find({})
        .toArray((err, documents) => {
            res.send(documents);
        })
    })

    app.get('/organizations/:id', (req, res) => {
        organizationsCollection.find({id: req.params.id})
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
        organizationsCollection.insertOne(events)
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

app.listen(process.env.PORT || port)