import Sequelize, { Model } from 'sequelize';

class Contato extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        fone1: Sequelize.STRING,
        fone2: Sequelize.STRING,
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

export default Contato;
