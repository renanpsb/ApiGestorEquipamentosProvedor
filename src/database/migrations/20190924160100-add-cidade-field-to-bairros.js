module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('bairros', 'cidade_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'cidades',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeCollumn('bairros', 'cidade_id'),
};
