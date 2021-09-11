// project database will going to be here
const { DataTypes } = require('sequelize');

module.exports = model;


function model(sequelize) {
    const attributes = {
        category_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        categoryName:{
            type:DataTypes.STRING,
            allowNull: false
        },
    };

    return sequelize.define('Category', attributes);
}
