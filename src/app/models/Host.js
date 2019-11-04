import Sequelize, { Model } from 'sequelize';

class Host extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        ip_address: Sequelize.STRING,
        user: Sequelize.STRING,
        password: Sequelize.STRING,
        mac: Sequelize.STRING,
        signal: Sequelize.STRING,
        user_pppoe: Sequelize.STRING,
        model: Sequelize.STRING,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Sistema, { foreignKey: 'sistema_id', as: 'sistema' });
    this.belongsTo(models.HostPop, { foreignKey: 'host_pop_id', as: 'pa' });
  }
}

export default Host;
