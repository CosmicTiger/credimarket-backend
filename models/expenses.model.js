const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class ExpensesModel extends Model { }

ExpensesModel.init(
    {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        beneficiary: {
            type: type.STRING(50),
            allowNull: false,
        },
        concept: {
            type: type.STRING,
            allowNull: false,
        },
        amount: {
            type: type.DOUBLE,
            allowNull: false,
        },
        expensed_at: {
            type: type.DATE,
            allowNull: false,
        },
        created_at: {
            type: type.DATE,
            allowNull: false,
            defaultValue: NOW(),
        },
        modified_at: {
            type: type.DATE,
            allowNull: true,
            defaultValue: NOW(),
        },
        disabled_at: {
            type: type.DATE,
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'credi_expenses', underscored: true }
)

module.exports = ExpensesModel
