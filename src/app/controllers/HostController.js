import * as Yup from 'yup';
import { Op } from 'sequelize';
import Host from '../models/Host';
import Sistema from '../models/Sistema';
import HostPop from '../models/HostPop';

class HostController {
  async index(req, res) {
    const { page = 1, rowsPage = 10 } = req.query;

    const hosts = await Host.findAll({
      where: { deletedAt: null },
      limit: rowsPage,
      offset: (page - 1) * rowsPage,
      include: [
        {
          model: Sistema,
          as: 'sistema',
          attributes: ['id', 'name'],
        },
        {
          model: HostPop,
          as: 'pa',
          attributes: ['id', 'ssid', 'criptografia'],
        },
      ],
    });

    return res.json(hosts);
  }

  async getName(req, res) {
    const { page = 1, rowsPage = 10 } = req.query;
    const hosts = await Host.findAll({
      where: { deletedAt: null, name: { [Op.like]: `%${req.params.name}%` } },
      limit: rowsPage,
      offset: (page - 1) * rowsPage,
      include: [
        {
          model: Sistema,
          as: 'sistema',
          attributes: ['id', 'name'],
        },
        {
          model: HostPop,
          as: 'pa',
          attributes: ['id', 'ssid', 'criptografia'],
        },
      ],
    });
    return res.json(hosts);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      ip_address: Yup.string().required(),
      user: Yup.string().required(),
      password: Yup.string().required(),
      ssid: Yup.string(),
      criptografia: Yup.string(),
      mac: Yup.string(),
      sinal: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const host = await Host.create(req.body);

    return res.json(host);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    const host = await Host.findByPk(req.params.id);

    host.deletedAt = new Date();

    await host.save();

    return res.json(host);
  }
}

export default new HostController();
