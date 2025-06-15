const express = require('express');
const NodeCache = require('node-cache');
const striptags = require('striptags');

require('dotenv').config();

const app = express();
const cache = new NodeCache({stdTTL: process.env.TTL ||  60});

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
