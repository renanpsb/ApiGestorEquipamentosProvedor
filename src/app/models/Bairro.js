import Sequelize, { Model } from 'sequelize';

class Bairro extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Cidade, { foreignKey: 'cidade_id', as: 'cidade' });
  }
}

export default Bairro;
