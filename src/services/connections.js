// database connections will be done here
const config = require('../../config.json')
const mysql = require('mysql2/promise')
const { Sequelize } = require('sequelize')

initialize();

var db  = {};
async function getMysqlPool() {
  const { host, port, user, password, database } = config.database;
  return await mysql.createConnection({ host, port, user, password });
  
}

async function initialize() {
  const { host, port, user, password, database } = config.database;
  var connection = await getMysqlPool();
  //connection to mysql server done
  
  //create database if not exist
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  
  // connect to db
  const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
  
  // init models and add them to the exported db object
  db.User = require('../models/user')(sequelize);
  //  db.Category = require('../models/category')(sequelize)
  db.Question = require('../models/question')(sequelize);
  
  // db.Category.hasMany(db.Question);
  // db.Question.belongsTo(db.Category);
  
  // sync all models with database
  await sequelize.sync();
  
}

module.exports = db;