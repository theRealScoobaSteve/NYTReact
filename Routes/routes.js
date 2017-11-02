// Makes HTTP request for HTML page
const REQUEST = require("request")
const AXIOS = require("axios")
const PATH = require('path')
const MONGO = require("../ORM/mongoObject.js")
const BODYPARSER = require("body-parser")
let mongo = new MONGO("mongodb://Steve:123456@ds149974.mlab.com:49974/mongo-scraper")
const API_KEY = require("./config.js")
const EXPRESS = require('express')

module.exports = (APP) =>
{
    APP.use(BODYPARSER.json())
    APP.use(BODYPARSER.urlencoded(
    {
        extended: true
    }));
    
    APP.use(BODYPARSER.text())
    APP.use(BODYPARSER.json(
    {
        type: "application/vnd.api+json"
    }));
    
    // Priority serve any static files.
    APP.use(EXPRESS.static(PATH.resolve(__dirname, '../react-ui/build')))
    
    // Answer API requests.
    APP.get('/api', function (req, res) 
    {
        res.set('Content-Type', 'application/json')
        res.send('{"message":"Hello from the custom server!"}')
    })
    
    // All remaining requests return the React app, so it can handle routing.
    APP.get('*', function(request, response) 
    {
        response.sendFile(PATH.resolve(__dirname, '../react-ui/build', 'index.html'))
    })

    APP.post("/api/search", function(req, res)
    {
        const POST_REQUEST = req.body;

        console.log(POST_REQUEST)

        REQUEST.get(
        {
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: 
            {
              'api-key': API_KEY.MY_KEY,
              'q': POST_REQUEST.title
            },
        }, function(err, response, body) 
        {
            body = JSON.parse(body);
            console.log(body);
        })

         
    })
}
