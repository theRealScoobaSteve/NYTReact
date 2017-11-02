const EXPRESS = require('express')
const PATH = require('path')
const BODYPARSER = require("body-parser")
const APP = EXPRESS();
const PORT = process.env.PORT || 5000

require("./Routes/routes.js")(APP)

APP.listen(PORT, function () 
{
	console.log(`Listening on port ${PORT}`)
});