import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import HostController from './app/controllers/HostController';
import SistemaController from './app/controllers/SistemaController';
import FileController from './app/controllers/FileController';

import multerConfig from './config/multer';
import verifyIfAuth from './app/middlewares/auth';
import MikrotikContoller from './app/controllers/MikrotikContoller';
import EmailController from './app/controllers/EmailController';

const { Router } = require('express');

const routes = new Router();

const upload = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ message: 'Bem vindo API' });
});

routes.post('/session', SessionController.store);
routes.put('/session', SessionController.validator);

routes.get('/arp_mkt/:ip', MikrotikContoller.arp);

routes.get('/bloqueioIp/:ip', EmailController.bloqueioIp);

routes.use(verifyIfAuth);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);

routes.get('/hosts', HostController.index);
routes.get('/hosts/:name', HostController.getName);
routes.post('/hosts', HostController.store);
routes.put('/hosts', HostController.update);
routes.delete('/hosts/:id', HostController.delete);

routes.post('/sistema', SistemaController.store);

export default routes;
