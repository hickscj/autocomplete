'use strict';

const express = require('express');
const app = express();
const fs = require('fs');

const { MongoClient } = require("mongodb");
const url = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017";
const dbName = "autocomplete";
const collectionName = "words";

const baseURL = '/api/v1';
const port = 3000;

const populateDB = async (words) => {
    try {
        const data = fs.readFileSync('common-words.json');
        const wordJSON = JSON.parse(data);
        await words.insertMany(wordJSON);
    } catch(err) {
        console.log(`Error attempting to populate database: ${err.message}`);
    }
};

async function start() {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const words = db.collection(collectionName);

    const numWords = await words.countDocuments();
    if(numWords === 0) {
        populateDB(words);
    }

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
        const searchTerm = req.query.q;
        const re = `^${searchTerm}`;
        const searchRegex = new RegExp(re, 'gi');
        const searchLimit = req.query.limit || 8;
        
        // when developing the frontend with parcel build, allow that origin
        res.header('Access-Control-Allow-Origin', origin);

        words.find({
            "word": { $regex: searchRegex }
        }, {"word": true})
            .limit(searchLimit)
            .toArray( (err, docs) => {
                if(err) return res.send(err.message);
                res.send(docs);
            });
    })

    app.listen(port, () => {
        console.log('autocomplete api server started...');
    });
}

start();
