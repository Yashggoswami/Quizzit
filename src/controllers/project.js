// project backend functionalities will be written here
const pool = require('../services/connections')
// const mysql = require('mysql2')
const {Sequelize} = require('sequelize');


admin = (req, res) => {
    res.render('admin')
}
//quiz test
quiz = (req, res) => {
    res.render('quiz-board')
}
const resultCalculation = async(req,res)=>{
    try{
        let data = JSON.parse(req.body.resultData);
        var arr = [];
        for(let obj in data){
            arr.push(data[obj]['question_id']);
        }
        await pool.Question.findAll({
            where: {
                question_id: arr // Same as using `id: { [Op.in]: [1,2,3] }`
            }}
            ).then((result)=>{
                var score = 0;
                data.sort((a,b)=>{return a['question_id']-b['question_id']});
                result.sort((a,b)=>{return a['question_id']-b['question_id']});
                for(let index in data){
                    if(data[index]['submittedAnswer'] == result[index]['correctAnswer'])
                    {
                        score+=1;
                    }
                }
                // res.send(JSON.stringify(data)+"\n"+JSON.stringify(result)+"\n"+score);
                req.session.result = score;
                req.session.save((err)=>{
                    res.redirect('/result');
                })
            }).catch((err)=>{
                console.log("error in query"+err)
            })

    }catch(err){
        console.log("error"+err)
    }    
}
result = (req, res) => {
    res.render('result')
}
//quiz test test link
quiztest = async (req, res) => {
    return await pool.Question.findAll({ order: Sequelize.literal('rand()'), limit: 10 }).then((question) => {
        
        // deleting the correct answer key and value pair and formatting the necessary data
        que = []
        for(let q in question){
            temp = question[q]['dataValues'];
            delete temp.correctAnswer;
            temp.submittedAnswer = undefined;
            que.push(temp);
        }

        res.send(que);

        // res.send(que);
        
    }).then().catch(); 
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

module.exports = {resultCalculation:resultCalculation,quiz:quiz,quiztest:quiztest,admin:admin,addQuestion:addQuestion,result:result}
