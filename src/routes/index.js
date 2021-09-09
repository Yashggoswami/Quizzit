const app = require('express').Router()
const user = require('../controllers/user')

// <------------- all routing work will be done here ----------->
app.get('/login',user.login)
app.get('/signup',user.register)
app.get('/',(req,res) => {res.render('dashboard')})




// <------------- all routing work will be done here ----------->

module.exports = app