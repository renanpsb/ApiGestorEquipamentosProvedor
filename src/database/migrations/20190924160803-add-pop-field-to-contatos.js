module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('contatos', 'pop_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'pops',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeCollumn('contatos', 'pop_id'),
};
