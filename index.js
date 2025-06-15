const express = require('express');
const NodeCache = require('node-cache');
const db = require('./db');

require('dotenv').config();

const app = express();
const cache = new NodeCache({stdTTL: process.env.TTL ||  60});
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', async (req, res) => {
    const cacheKey = req.query.url;
    const cachedData = cache.get(cacheKey);

    db.prepare(`
    INSERT INTO users (url) VALUES (?)
    `).run(req.query.url);

    if(cachedData){
        res.send(cachedData);
        return;
    }
    try {
        const freshData =  await fetchData(cacheKey);
        cache.set(cacheKey, freshData);
        res.send(freshData);
    }
    catch(error){
        res.status(500).send('Error fetching data')
    }
})

app.get('/logs', (req, res) => {
    const logs = db.prepare(`
    SELECT * FROM users
    `).all();
    res.send(logs);
});

app.post('/blacklist', (req, res) => {
    db.prepare(`
    INSERT INTO blacklisted (url) VALUES (?)
    `).run(req.body.url);
    res.send(`Blacklisted ${req.body.url}`);
});

app.get('/blacklist', (req, res) => {
    const urls = db.prepare(`
    SELECT * FROM blacklisted
    `).all();
    res.send(urls);
});

fetchData = async(source) => {
    return await(await fetch(source)).text();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
