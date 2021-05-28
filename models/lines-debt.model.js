const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')

class LinesDebtModel extends Model { }

LinesDebtModel.init(
    {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        line_action_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        total_current: {
            type: type.DOUBLE,
            allowNull: false,
        },
        payment_at: {
            type: type.DATE,
            allowNull: false,
        }
    },
    { sequelize: db, modelName: 'credi_line_debt', underscored: true }
)

module.exports = LinesDebtModel
