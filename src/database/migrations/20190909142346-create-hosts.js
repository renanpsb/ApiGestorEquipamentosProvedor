module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('hosts', {
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
    user_pppoe: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    signal: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    mac: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    model: {
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

  down: (queryInterface) => queryInterface.dropTable('hosts'),
};
