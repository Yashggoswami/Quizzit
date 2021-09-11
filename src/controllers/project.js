// project backend functionalities will be written here
const db = require('mysql2')
const pool = require('../services/connections')

admin = (req, res) => {
    res.render("admin")
}

addquestion = (req,res) =>{
     pool.getMySqlPool().query(`CREATE DATABASE IF NOT EXISTS yash;`)
     res.send({
        "category":req.body.category,
        "question":req.body.question,
        "correct ans":req.body.correctAnswer,
    })
    // connection.query(`Insert into Questions values(\`${req.body.question}\`,\`${req.body.correctAnswer}\`,\`${req.body.correctAnswer}\`, \`${req.body.option1}\`,\`${req.body.option2}\`,\`${req.body.option3}\`,,\`${req.body.option4}\`,"yash");`);
    
}

module.exports = {admin:admin,addquestion:addquestion}