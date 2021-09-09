const express = require('express'),
    app = express(),
    hbs = require('hbs')


app.use(express.static("src/public"))
// directing to routes directory for routing purpose
app.use('/',require('./routes'))
app.set('views','src/views')

app.listen(8080,(req,res) => {
    console.log("server listening to http://localhost:8080")
})