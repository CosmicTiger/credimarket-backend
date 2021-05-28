const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class ClientsModel extends Model { }

ClientsModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        sys_code: {
            type: type.STRING(20),
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: type.STRING(255),
            allowNull: false,
        },
        mid_name: {
            type: type.STRING(255),
            allowNull: true,
        },
        last_name: {
            type: type.STRING(255),
            allowNull: false,
        },
        secondary_last_name: {
            type: type.STRING(255),
            allowNull: true,
        },
        national_id: {
            type: type.STRING(255),
            unique: true,
            allowNull: false,
        },
        status_id: {
            type: type.INTEGER(11),
            allowNull: null,
        },
        phone: {
            type: type.STRING(255),
            unique: true,
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
        disabled_at: {
            type: type.DATE,
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'credi_clients', underscored: true }
)

module.exports = ClientsModel
