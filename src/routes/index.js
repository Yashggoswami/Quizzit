const app = require('express').Router()
const user = require('../controllers/user')

// <------------- all routing work will be done here ----------->
app.get('/login',user.login)
// app.post('/authenticate/:username/:password',user.authenticate)
app.post('/authenticate',user.authenticate)
app.get('/signup',user.register)
app.post('/createAccount',user.createAccount)
app.get('/',(req,res) => {res.render('dashboard')})




// <------------- all routing work will be done here ----------->

module.exports = app