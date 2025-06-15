const express = require('express');
const NodeCache = require('node-cache');

require('dotenv').config();

const app = express();
const cache = new NodeCache({stdTTL: process.env.TTL ||  60});

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const cacheKey = req.query.url;

    const cachedData = cache.get(cacheKey);

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

fetchData = async(source) => {
    return await(await fetch(source)).text();
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
