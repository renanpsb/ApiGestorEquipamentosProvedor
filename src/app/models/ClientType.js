import Sequelize, { Model } from 'sequelize';

class ClientType extends Model {
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

export default ClientType;
