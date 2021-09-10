// user authentication i.e. login, register logout work will be done here
login = (req,res)=>{
res.render("login")
}

authenticate = (req,res)=>{
    // console.log(req)
    console.log(req.body.username)
    console.log(req.body.password)
    res.send({username:req.body.username,password:req.body.password})
    // res.redirect();
}

createAccount = (req,res)=>{
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.password)
    res.send({username:req.body.username,
        email:req.body.email,
        password:req.body.password})
    // res.redirect()
}

register = (req,res) =>{
    res.render("register")
}

module.exports = { login: login,register:register,createAccount:createAccount,authenticate:authenticate }