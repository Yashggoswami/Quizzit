// user authentication i.e. login, register logout work will be done here
login = (req,res)=>{
res.render("login")
}

register = (req,res) =>{
    res.render("register")
}

module.exports = { login: login,register:register }