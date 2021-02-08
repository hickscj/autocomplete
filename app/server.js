'use strict';

const express = require('express');
const app = express();
const querystring = require('querystring');

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
const dbName = "autocomplete";
const collectionName = "words";

async function start() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const words = db.collection(collectionName);

    app.get("/", (req, res) => {
        res.json({'message': 'autocomplete api home'});
    });

    app.get("/set-words", async (req, res) => {
        const c = await words.insertOne({'word': 'a', 'weight': 0});
        res.send(c);
    });

    app.get("/see", async (req, res) => {
        const myCursor = await words.find({});
        let stuff = [];
        let safety = 0;
        while (myCursor.hasNext() && safety < 3) {
            safety++;
            stuff.push(await myCursor.next());
        }
        res.json(stuff);
    })

    app.listen(3000, () => {
        console.log('server started');
    });
}

start();
