
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'hosts',
    'sistema_id',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'sistema',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
    },
  ),

  down: (queryInterface) => queryInterface.removeCollumn('hosts', 'sistema_id'),
};
