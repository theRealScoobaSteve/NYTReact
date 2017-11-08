// Makes HTTP request for HTML page
const REQUEST = require("request")
const AXIOS = require("axios")
const PATH = require('path')
const MONGO = require("../ORM/mongoObject.js")
const BODYPARSER = require("body-parser")
let mongo = new MONGO("mongodb://Steve:123456@ds243335.mlab.com:43335/favorites")
const API_KEY = require("./key.js")
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
        const POST_REQUEST = req.body.params

        //Concatonates the data to a string creating a the beginning and end date
        const BEGIN = POST_REQUEST.year + POST_REQUEST.month  + "01"
        const END = POST_REQUEST.year + POST_REQUEST.month  + "29"

        mongo.DeleteMany('favorites', {isFavorites: false}).then(function(res)
        {
            
        }).catch(function(err)
        {
            console.log(err)
        })

        //Makes a request to the NYT API
        let results = []
        
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
            //Grabs the response from the API
            body = JSON.parse(body)
            console.log(body.response)
            if(body.response !== undefined)
            {
                
                
                let info = body.response.docs
                if(info)
                {
                    for(var i = 0; i < 5; i++)
                    {
                        results.push(info[i])
                        results[i].isFavorites = false
                        results[i].report = true
                        mongo.Insert('favorites', results[i]).then(function(res)
                        {
                        })
                    }
                    //Sends the data back to the client
                    res.json(results)
                }

                
            }
            else
            {
                let report = [{report: false}];
                res.json(report)
            }
            

            
        })     
    })

    APP.post("/api/addfav", function(req,res)
    {
        let data = req.body.params
        mongo.Update('favorites', data, {isFavorites: true}).then(function(results)
        {   
            try
            {
                if(err) throw err
            }
            catch(err)
            {
                // console.log(err)
            }
            res.json(results)
        })
    })

    APP.post("/api/favorites", function(req,res)
    {
        mongo.Query("favorites", {isFavorites: true})
        .then(function(results)
        {
            res.json(results)
        })
    })

    APP.post("/api/removefav", function(req,resolve)
    {
        let data = req.body.params
        let send = {report: false}
        mongo.Update('favorites', data, {isFavorites: false}).then(function(results)
        {
            send.report = true
            resolve.json(send) 
        })
    })
}
