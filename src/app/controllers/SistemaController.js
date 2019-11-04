import * as Yup from 'yup';
import Sistema from '../models/Sistema';

class SistemaController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const sistema = await Sistema.create(req.body);

    return res.json(sistema);
  }
}

export default new SistemaController();
