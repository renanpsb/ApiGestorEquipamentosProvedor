import Sequelize, { Model } from 'sequelize';

class Sistema extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        // versao: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );
  }
}

export default Sistema;
