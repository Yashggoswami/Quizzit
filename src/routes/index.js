const app = require('express').Router()
const user = require('../controllers/user')
// <------------- all routing work will be done here ----------->
app.get('/',(req,res) => {res.render('dashboard')})
// app.get('/login',user.login)




// <------------- all routing work will be done here ----------->

module.exports = app