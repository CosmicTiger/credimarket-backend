const { DataTypes: type, Model } = require('sequelize')
const db = require('../config/db.config')
const { NOW } = require('../config/constants.config')

class ProductsModel extends Model { }

ProductsModel.init(
    {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_code: {
            type: type.STRING(20),
            unique: true,
            allowNull: false,
        },
        name: {
            type: type.STRING(75),
            allowNull: false,
        },
        description: {
            type: type.STRING,
            allowNull: true,
        },
        product_cost: {
            type: type.FLOAT,
            allowNull: false,
        },
        price: {
            type: type.FLOAT,
            allowNull: false,
        },
        in_stock: {
            type: type.INTEGER(11),
            allowNull: true,
            defaultValue: 0,
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
    { sequelize: db, modelName: 'credi_products', underscored: true }
)

module.exports = ProductsModel
