const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class LinesActionModel extends Model { }

LinesActionModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        action_code: {
            type: type.STRING(20),
            unique: true,
            allowNull: false,
        },
        client_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        line_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        total_created_at: {
            type: type.DOUBLE,
            allowNull: false,
        },
        debt_time: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        payment_frequency: {
            type: type.FLOAT,
            allowNull: false,
        },
        payment_amount: {
            type: type.FLOAT,
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
    { sequelize: db, modelName: 'credi_lines', underscored: true }
)

module.exports = LinesActionModel
