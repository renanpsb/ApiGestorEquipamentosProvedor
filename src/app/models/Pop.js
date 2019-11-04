import Sequelize, { Model } from 'sequelize';

class Pop extends Model {
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
    this.belongsTo(models.Bairro, { foreignKey: 'bairro_id', as: 'bairro' });
    this.hasMany(models.Contato, { foreignKey: 'pop_id', as: 'contato' });
  }
}

export default Pop;
