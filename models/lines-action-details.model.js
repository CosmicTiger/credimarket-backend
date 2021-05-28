const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class LinesActionDetailsModel extends Model { }

LinesActionDetailsModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        line_action_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        product_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        quantity: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        debt: {
            type: type.DOUBLE,
            allowNull: false,
        },
    },
    { sequelize: db, modelName: 'credi_line_action_detail', underscored: true }
)

module.exports = LinesActionDetailsModel
