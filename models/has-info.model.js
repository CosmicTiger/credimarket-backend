const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class HasInfoModel extends Model { }

HasInfoModel.init(
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
        description: {
            type: type.STRING(100),
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'has_info', underscored: true }
)

module.exports = HasInfoModel
