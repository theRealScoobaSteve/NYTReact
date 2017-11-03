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
        //Grabs the json
        const POST_REQUEST = req.body
        //Concatonates the data to a string creating a the beginning and end date
        const BEGIN = String(POST_REQUEST.year) + POST_REQUEST.month  + "01"
        const END = String(POST_REQUEST.year) + POST_REQUEST.month  + "29"

        console.log(POST_REQUEST)

        REQUEST.get(
        {
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: 
            {
              'api-key': API_KEY.MY_KEY,
              'q': POST_REQUEST.title,
              'begin_date': BEGIN,
              'end_date': END
            }
        },function(err, response, body) 
        {
            body = JSON.parse(body)
            let results = []
            let info = body.response.docs
            console.log(info)
            for(var i = 0; i < 5; i++)
            {
                results.push(info[i])
            }
            res.json(results)
        })     
    })
}
