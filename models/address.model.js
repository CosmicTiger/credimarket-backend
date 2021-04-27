const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class AddressModel extends Model { }

AddressModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: type.STRING(100),
            allowNull: false,
        },
        zip_code: {
            type: type.STRING(15),
            allowNull: true,
        },
        latitude: {
            type: type.INTEGER(11),
            allowNull: true,
        },
        longitude: {
            type: type.INTEGER(11),
            allowNull: true,
        },
        reference: {
            type: type.TEXT,
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
        disable_at: {
            type: type.DATE,
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'address' }
)

module.exports = AddressModel
