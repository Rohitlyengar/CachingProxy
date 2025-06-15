const express = require('express');
const router = require('./routes/router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
    res.send('Caching Proxy')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
