import * as Yup from 'yup';
import { Op } from 'sequelize';
import Pop from '../models/Pop';
import HostPop from '../models/HostPop';

class HostPopController {
  async index(req, res) {
    const { page = 1, rowsPage = 10 } = req.query;

    const hosts = await HostPop.findAll({
      where: { deletedAt: null },
      limit: rowsPage,
      offset: (page - 1) * rowsPage,
      include: [
        {
          model: Pop,
          as: 'pop',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(hosts);
  }

  async getName(req, res) {
    const { page = 1, rowsPage = 10 } = req.query;
    const hosts = await HostPop.findAll({
      where: { deletedAt: null, name: { [Op.like]: `%${req.params.name}%` } },
      limit: rowsPage,
      offset: (page - 1) * rowsPage,
      include: [
        {
          model: Pop,
          as: 'pop',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(hosts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      // name: Yup.string().required(),
      // ip_address: Yup.string().required(),
      // user: Yup.string().required(),
      // password: Yup.string().required(),
      // ssid: Yup.string(),
      // criptografia: Yup.string(),
      // mac: Yup.string(),
      // sinal: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const hostPop = await HostPop.create(req.body);

    return res.json(hostPop);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    const hostPop = await HostPop.findByPk(req.params.id);

    hostPop.deletedAt = new Date();

    await hostPop.save();

    return res.json(hostPop);
  }
}

export default new HostPopController();
