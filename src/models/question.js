// project database will going to be here
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        question_id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true
        },
        questionStatement:{
            type:DataTypes.STRING,
            allowNull: false
        },
        correctAnswer:{
            type:DataTypes.STRING,
            allowNull:false
        },
        option1:{
            type:DataTypes.STRING,
            allowNull:false
        },
        option2:{
            type:DataTypes.STRING,
            allowNull:false
        },
        option3:{
            type:DataTypes.STRING,
            allowNull:false
        } ,
        option4:{
            type:DataTypes.STRING,
            allowNull:false
        } 
    };

    return sequelize.define('Question', attributes);
}