// project backend functionalities will be written here
const db = require('mysql2')
const { restart } = require('nodemon')
const pool = require('../services/connections')
// const mysql = require('mysql2')
const connections = require('../services/connections')


admin = (req, res) => {
    res.render('admin')
}
quiz = async (req, res) => {
    return await pool.Question.findAll({ order: Sequelize.literal('rand()'), limit: 2 }).then((question) => {
        // single random encounter
        res.send(question);
    }); 
}
quiztest = (req, res) => {
    res.render('quiz-board-test')
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
 
    await connection.query('use Quizzitdb');
    
    await connection.query(`INSERT INTO \`Questions\`(\`questionStatement\`, \`correctAnswer\`, \`option1\`, \`option2\`, \`option3\`, \`option4\`) VALUES ('\`${req.body.questionStatement}\`','\`${req.body.correctAns}\`','\`${req.body.option1}\`','\`${req.body.option2}\`','\`${req.body.option3}\`','\`${req.body.option4}\`')`);
   
    res.send("done insertion.....")
    
}

module.exports = {quiz:quiz,quiztest:quiztest,admin:admin,addQuestion:addQuestion}
