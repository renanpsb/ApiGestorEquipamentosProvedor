import Sequelize, { Model } from 'sequelize';

class HostPop extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        ip_address: Sequelize.STRING,
        user: Sequelize.STRING,
        password: Sequelize.STRING,
        ssid: Sequelize.STRING,
        criptografia: Sequelize.STRING,
        mac: Sequelize.STRING,
        modo_operacao: Sequelize.STRING,
        deletedAt: Sequelize.DATE,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Pop, { foreignKey: 'pop_id', as: 'pop' });
  }
}

export default HostPop;
