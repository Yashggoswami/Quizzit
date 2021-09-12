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
    connection.query("create database vinay");
    console.log("aarae")
    res.render("admin")
}

module.exports = {admin:admin,addQuestion:addQuestion}
