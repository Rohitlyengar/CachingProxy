const express = require('express');
const NodeCache = require("node-cache");
const db = require('../database/db.js');

const router = express.Router();
const cache = new NodeCache({stdTTL: process.env.TTL ||  60});

router.get('/', async (req, res) => {
    const cacheKey = req.query.url;
    const cachedData = cache.get(cacheKey);

    db.prepare(`
    INSERT INTO users (url) VALUES (?)
    `).run(cacheKey);

    const urls = db.prepare(`
    SELECT * FROM blacklisted
    `).all();

    for (const url of urls)
    {
        const blacklisted = normalize(url['url']);
        const target = normalize(cacheKey);
        if(target  === blacklisted)
        {
            res.status(403).send('Forbidden Access');
            return;
        }
    }

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

const fetchData = async(source) => {
    return await(await fetch(source)).text();
}

const normalize = (url) => {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .toLowerCase()
        .split('/')[0];
}

router.get('/logs', (req, res) => {
    const logs = db.prepare(`
    SELECT * FROM users
    `).all();
    res.send(logs);
});

router.post('/blacklist', (req, res) => {
    db.prepare(`
    INSERT INTO blacklisted (url) VALUES (?)
    `).run(req.body.url);
    res.send(`Blacklisted ${req.body.url}`);
});

router.get('/blacklist', (req, res) => {
    const urls = db.prepare(`
    SELECT * FROM blacklisted
    `).all();
    res.send(urls);
});

module.exports = router;
