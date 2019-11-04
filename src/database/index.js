import Sequelize from 'sequelize';

import User from '../app/models/User';
import Sistema from '../app/models/Sistema';
import Host from '../app/models/Host';
import File from '../app/models/File';
import HostPop from '../app/models/HostPop';
import Cidade from '../app/models/Cidade';
import Bairro from '../app/models/Bairro';
import Contato from '../app/models/Contato';
import Pop from '../app/models/Pop';

import databaseConfig from '../config/database';

const models = [User, Sistema, Host, File, HostPop, Cidade, Bairro, Contato, Pop];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();

// OBS: O NOME DO MODEL DEVE SER IGUAL A TABELA SEM O S NO FINAL E COM UNDERSCORE NO BANCO
// EX: HostPop = host_pops / Sistema = sistemas
// O APELIDO NO METODO ASSOCIETE TEM QUE SER O MESMO DO INCLUDE NA CHAMADA
