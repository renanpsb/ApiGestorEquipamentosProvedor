module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('host_pop', 'pop_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Pop',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeCollumn('host_pop', 'pop_id'),
};
