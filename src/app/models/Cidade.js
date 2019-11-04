import Sequelize, { Model } from 'sequelize';

class Cidade extends Model {
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
}

export default Cidade;
