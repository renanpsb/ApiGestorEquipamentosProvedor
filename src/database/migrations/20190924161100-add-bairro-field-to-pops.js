module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('pops', 'bairro_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'bairros',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeCollumn('pops', 'bairro_id'),
};
