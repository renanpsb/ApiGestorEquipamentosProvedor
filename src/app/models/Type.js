import Sequelize, { Model } from 'sequelize';

class Type extends Model {
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

export default Type;
