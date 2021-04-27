const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class UserAddressModel extends Model { }

UserAddressModel.init(
    {
        id: {
            type: type.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        address_id: {
            type: type.INTEGER(11),
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER(11),
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
    { sequelize: db, modelName: 'user_address' }
)

module.exports = UserAddressModel
