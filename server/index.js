const express = require('express')
const app = express()
const PORT = 3000
const scrapers = require('./scrapers');

const bodyParser = require('body-parser');
const db = require('./db')

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get('/creators', async (req, res) => {
    const creators = await db.getAllCreators();
    return res.send(creators)
})

app.post('/creators', async (req, res) => {
    const channelData = await scrapers.scrapeChannel(req.body.channelURL);
    const creators = await db.insertCreator(channelData.name, channelData.avatarURL, req.body.channelURL)
    res.send(creators);
})


app.listen(PORT, () => {
    console.log("running")
})