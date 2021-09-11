const app = require('express').Router()
const user = require('../controllers/user')
const proj = require('../controllers/project')
// <------------- all routing work will be done here ----------->
app.get('/login',user.login)
app.get('/admin',proj.admin)
app.post('/addquestion',proj.addquestion)
// app.post('/authenticate/:username/:password',user.authenticate)
// app.post('/authenticate',user.authenticate)
app.get('/signup',user.register)
// app.post('/createAccount',user.createAccount)
app.get('/',(req,res) => {res.render('dashboard')})

app.post('/authenticate', user.authenticateSchema, user.authenticate);
app.post('/createAccount', user.registerSchema, user.registeruser);



// <------------- all routing work will be done here ----------->

module.exports = app