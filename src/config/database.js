module.exports = {
  dialect: 'mariadb',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'system-api',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
