const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    error_handler = require('./services/error_handler')


app.use(express.static("src/public"))
// directing to routes directory for routing purpose
app.use('/',require('./routes'))

app.set('views','src/views')
app.set('view engine','hbs')
hbs.registerPartials('src/views/partials')
app.use(error_handler)

app.listen(8080,(req,res) => {
    console.log("server listening to http://localhost:8080")
})