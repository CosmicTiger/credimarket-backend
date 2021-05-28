// sequelize.loader.js
// import models for sync
const {
    ClientsModel,
    ClientsAddressModel,
    HasInfoModel,
    InformationUsersModel,
    LinesModel,
    LinesActionModel,
    LinesActionDetailModel,
    LinesDebtModel,
    ProductsModel,
    StatusModel,
    UserModel,
    UserAddressModel,
    UserPermissionsModel,
} = require('../models')

/**
 * sync sequelize models with database
 * @param {Sequelize} sequelizeInstance
 */
module.exports = async function (sequelizeInstance) {
    if (!sequelizeInstance || !sequelizeInstance.sync) {
        return
    }

    // Configuring model relationships
    // ClientsModel relationships
    ClientsModel.hasOne(StatusModel, { foreignKey: 'status_id' })
    ClientsModel.hasMany(ClientsAddressModel, { foreignKey: 'client_id' })
    ClientsModel.belongsTo(LinesActionModel, { foreignKey: 'client_id' })

    // ClientsAddressModel relationships
    ClientsAddressModel.belongsTo(ClientsModel, { foreignKey: 'client_id' })
    ClientsAddressModel.hasOne(StatusModel, { foreignKey: 'status_id' })

    // HasInfoModel relationships
    HasInfoModel.hasMany(UserModel, { foreignKey: 'has_info_id' })

    // InformationUsersModel relationship
    InformationUsersModel.belongsTo(UserModel, { foreignKey: 'user_id' })

    // LinesModel relationships
    LinesModel.hasOne(StatusModel, { foreignKey: 'status_id' })
    LinesModel.belongsTo(LinesActionModel, { foreignKey: 'line_id' })

    // LinesActionModel relationships
    LinesActionModel.hasMany(ClientsModel, { foreignKey: 'client_id' })
    LinesActionModel.hasMany(LinesModel, { foreignKey: 'line_id' })
    LinesActionModel.hasOne(StatusModel, { foreignKey: 'status_id' })
    LinesActionModel.belongsTo(LinesActionDetailModel, { foreignKey: 'line_action_id' })
    LinesActionModel.belongsTo(LinesDebtModel, { foreignKey: 'line_action_id' })

    // LinesActionDetailModel relationships
    LinesActionDetailModel.hasMany(LinesModel, { foreignKey: 'line_action_id' })
    LinesActionDetailModel.hasMany(ProductsModel, { foreignKey: 'product_id' })

    // LinesDebtModel relationships
    LinesDebtModel.hasMany(LinesActionModel, { foreignKey: 'line_action_id' })

    // ProductsModel relationships
    ProductsModel.hasOne(StatusModel, { foreignKey: 'status_id' })
    ProductsModel.belongsTo(LinesActionDetailModel, { foreignKey: 'product_id' })

    // StatusModel relationships
    StatusModel.belongsTo(ClientsModel, { foreignKey: 'status_id' })
    StatusModel.belongsTo(UserModel, { foreignKey: 'status_id' })
    StatusModel.belongsTo(LinesModel, { foreignKey: 'status_id' })
    StatusModel.belongsTo(ProductsModel, { foreignKey: 'status_id' })

    // UserModel relationships
    UserModel.belongsTo(HasInfoModel, { foreignKey: 'has_info_id' })
    UserModel.belongsTo(UserPermissionsModel, { foreignKey: 'permission_id' })
    UserModel.hasOne(StatusModel, { foreignKey: 'status_id' })
    UserModel.hasMany(UserAddressModel, { foreignKey: 'user_id' })
    UserModel.hasOne(InformationUsersModel, { foreignKey: 'user_id' })

    // UserAddressModel relationships
    UserAddressModel.belongsTo(UserModel, { foreignKey: 'user_id' })
    UserAddressModel.hasOne(StatusModel, { foreignKey: 'status_id' })

    // UserPermissionsModel relationships
    UserPermissionsModel.hasMany(UserModel, { foreignKey: 'permission_id' })

    // models sync
    await sequelizeInstance.sync({ alter: false })

    return sequelizeInstance
}
