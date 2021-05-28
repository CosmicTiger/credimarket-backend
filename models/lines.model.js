const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class LinesModel extends Model { }

LinesModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(50),
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER,
            allowNull: false,
        },
        code_line: {
            type: type.STRING(20),
            allowNull: true,
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
        disable_at: {
            type: type.DATE,
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'credi_lines', underscored: true }
)

module.exports = LinesModel
