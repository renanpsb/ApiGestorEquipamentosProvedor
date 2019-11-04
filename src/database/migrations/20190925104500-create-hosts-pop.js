module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('host_pops', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ip_address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    user: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ssid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    criptografia: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mac: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    modo_operacao: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  }),

  down: (queryInterface) => queryInterface.dropTable('host_pops'),
};
