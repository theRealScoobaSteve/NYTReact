// Makes HTTP request for HTML page
var REQUEST = require("request")
const PATH = require('path')
const MONGO = require("../ORM/mongoObject.js")
const BODYPARSER = require("body-parser")
let mongo = new MONGO("mongodb://Steve:123456@ds149974.mlab.com:49974/mongo-scraper")

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

}
