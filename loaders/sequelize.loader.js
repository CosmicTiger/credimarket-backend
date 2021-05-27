// sequelize.loader.js
// import models for sync
const {
    HasInfoModel,
    InformationUsersModel,
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
    // HasInfoModel relationships
    HasInfoModel.hasMany(UserModel, { foreignKey: 'has_info_id' })

    // InformationUsersModel relationship
    InformationUsersModel.belongsTo(UserModel, { foreignKey: 'user_id' })

    // StatusModel relationships
    StatusModel.belongsTo(UserModel, { foreignKey: 'status_id' })

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
