// project backend functionalities will be written here
const db = require('mysql2')
const pool = require('../services/connections')
// const mysql = require('mysql2')
const connections = require('../services/connections')


admin = (req, res) => {
    res.render('admin')
}


// let connection = mysql.createConnection({
//         "host":"localhost",
//         "port":3306,
//         "user":"root",
//         "password":"",
//         "database":"Quizzitdb"
//     });
// connection.connect();

addQuestion = async(req,res)=>{
    let connection = await pool.getMysqlPool()
    
    connection.query(`use Quizzitdb;insert into Questions (questionStatement,correctAnswer,option1,option2,option3,option4) values (\`${req.body.question}\`,\`${req.body.correctAns}\`,\`${req.body.option1}\`,\`${req.body.option2}\`,\`${req.body.option3}\`,\`${req.body.option4}\`);`);
    console.log("aarae")
    res.render("admin")
}

module.exports = {admin:admin,addQuestion:addQuestion}
