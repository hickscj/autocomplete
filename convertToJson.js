'use strict';

const fs = require('fs');

fs.readFile('common-words.txt', (err, data) => {
    const arr = [];
    data.toString().split("\n").forEach( item => {
        if(item) {
            arr.push({
                'word': item,
                'weight': 0
            });
        }
    });
    fs.writeFile('common-words.json', JSON.stringify(arr), (err) => {
        if(err) console.log(err);
    });
});
