// database connections will be done here
const config = require('../../config.json')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

module.exports = db = {};

initialize();

async function initialize() {
    const { host, port, user, password, database } = config.database;

    //connection to mysql server done
    const connection = await mysql.createConnection({ host, port, user, password });

    //create database if not exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

     // init models and add them to the exported db object
     db.User = require('../models/user')(sequelize);
     db.Category = require('../models/category')(sequelize)
     db.Question = require('../models/question')(sequelize)

    db.Category.hasMany(db.Question);
    db.Question.belongsTo(db.Category);
    
     // sync all models with database
     await sequelize.sync();

}
