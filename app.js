const express = require('express'),
    app = express(),
    hbs = require('hbs'),
    bodyparser = require('body-parser')
    error_handler = require('./src/services/error_handler')

app.use(bodyparser.urlencoded({extended:true}))
 app.use(express.static("./src/public"))
//app.use(express.static(__dirname + 'src/public'))
// directing to routes directory for routing purpose
app.use('/',require('./src/routes'))

app.set('views','src/views')
app.set('view engine','hbs')
hbs.registerPartials('src/views/partials')
app.use(error_handler)

app.listen(8080,(req,res) => {
    console.log("server listening to http://localhost:8080")
})