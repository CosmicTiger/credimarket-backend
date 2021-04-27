const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class InformationUsersModel extends Model { }

InformationUsersModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: type.INTEGER,
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
        email: {
            type: type.STRING(255),
            unique: true,
            allowNull: true,
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
        delete_at: {
            type: type.DATE,
            allowNull: true,
        }
    },
    { sequelize: db, modelName: 'information_users' }
)

module.exports = InformationUsersModel
