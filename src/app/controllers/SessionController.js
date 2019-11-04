import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';
import User from '../models/User';
import File from '../models/File';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],

    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id, name, avatar, role,
    } = user;


    return res.status(200).json({
      user: {
        id,
        name,
        email,
        avatar,
        role,
      },
      access_token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }

  async validator(req, res) {
    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');

    try {
      const { id } = jwt.verify(token, authConfig.secret);

      const {
        name, email, cpf, telefone, role, avatar,
      } = await User.findOne({
        where: { id },
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
          },
        ],

      });

      const updatedAccessToken = jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      });

      const response = {
        user: {
          id, name, email, cpf, telefone, role, avatar,
        },
        token_access: updatedAccessToken,
      };

      return res.json(response);
    } catch (err) {
      return res.status(401).json({ error: 'Token Invalid' });
    }
  }
}

export default new SessionController();
