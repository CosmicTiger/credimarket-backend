const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class StatusModel extends Model { }

StatusModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: type.STRING(35),
            allowNull: false,
        },
        desciption: {
            type: type.STRING(75),
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'status' }
)

module.exports = StatusModel
