module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn('hosts', 'hosts-pop_id', {
    type: Sequelize.INTEGER,
    references: {
      model: 'hosts-pop',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    allowNull: true,
  }),

  down: (queryInterface) => queryInterface.removeCollumn('hosts', 'host-pop_id'),
};
