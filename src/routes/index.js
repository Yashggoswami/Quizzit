const express = require('express'),
    app = express()

// <------------- all routing work will be done here ----------->
app.get('/',(req,res) => res.send("inside router file"))





// <------------- all routing work will be done here ----------->

module.exports = app