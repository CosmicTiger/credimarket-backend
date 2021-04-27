const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class UserModel extends Model { }

UserModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: type.STRING(100),
            unique: true,
            allowNull: false,
        },
        password: {
            type: type.STRING(100),
            allowNull: false,
        },
        has_email: {
            type: type.INTEGER(11),
            allowNull: true,
        },
        has_phone: {
            type: type.INTEGER(11),
            allowNull: true,
            defaultValue: 1,
        },
        permission_id: {
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
    { sequelize: db, modelName: 'users' }
)

module.exports = UserModel
