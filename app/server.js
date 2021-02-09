'use strict';

const express = require('express');
const app = express();
// const querystring = require('querystring');

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
const dbName = "autocomplete";
const collectionName = "words";

const baseURL = '/api/v1';
const port = 3000;

async function start() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const words = db.collection(collectionName);

    app.get(baseURL + "/test", (req, res) => {
        res.json({'message': 'API test success!'});
    });

    app.get(baseURL + "/add-weight", (req, res) => {
        if(req.query.amount && req.query.word) {
            console.log(`Adding ${req.query.amount} to word ${req.query.word}`);
            res.send('added weight');
        }
        res.send('FAILED to add weight ');
    });

    app.get(baseURL + "/search", (req, res) => {
        const origin = req.get('origin');

        console.log(origin);

        const searchTerm = req.query.q;
        const re = `^${searchTerm}`;
        const searchRegex = new RegExp(re, 'gi');
        const searchLimit = req.query.limit || 8;
        console.log(searchTerm);
        
        // when developing the frontend with parcel build, allow that origin
        if(origin === 'http://localhost:1234') res.header('Access-Control-Allow-Origin', origin);

        words.find({
            "word": { $regex: searchRegex }
        }, {"word": true})
            .limit(searchLimit)
            .toArray( (err, docs) => {
                res.header('Access-Control-Allow-Origin', origin);
                if(err) return res.send(err.message);
                res.send(docs);
            });
    })

    app.listen(port, () => {
        console.log('autocomplete api server started...');
    });
}

start();
