/* eslint-disable global-require */
import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.app = express();
    this.server = require('http').Server(this.app);
    this.io = require('socket.io')(this.server);
    let stopStream = false;

    this.io.on('connection', (socket) => {
      stopStream = false;
      const RosApi = require('node-routeros').RouterOSAPI;

      socket.on('gpon traffic', (user) => {
        const conn = new RosApi({
          host: '201.7.225.11',
          user: 'api_user',
          password: '80s6d78g217e36t1287S^D(&*^&*^*()^%%',
        });
        console.log('connected gpon traffic');
        conn
          .connect()
          .then(() => {
            const stream = conn.stream(
              ['/interface/monitor-traffic', `=interface=<pppoe-${user}>`],
              (error, packet) => {
                if (!error) {
                  if (stopStream === true) {
                    stream
                      .stop()
                      .then(() => {
                        conn.close();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    const pkt = {
                      tx: packet[0]['tx-bits-per-second'] / 1024 / 1024,
                      rx: packet[0]['rx-bits-per-second'] / 1024 / 1024,
                    };

                    socket.emit('gpon traffic', pkt);
                  }
                } else {
                  socket.emit('erro. ');
                }
              },
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
      // disconnect
      socket.on('encerrar', () => {
        socket.leaveAll();
        stopStream = true;
        console.log('Cliente desconectado');
      });

      socket.on('predio traffic', (data) => {
        const conn = new RosApi({
          host: data.predioAddress,
          user: 'admin',
          password: 'kekeziel0904',
        });
        console.log('connected predio traffic');
        conn
          .connect()
          .then(() => {
            const stream = conn.stream(
              ['/interface/monitor-traffic', `=interface=<pppoe-${user}>`],
              (error, packet) => {
                if (!error) {
                  if (stopStream === true) {
                    stream
                      .stop()
                      .then(() => {
                        conn.close();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    const pkt = {
                      tx: packet[0]['tx-bits-per-second'] / 1024 / 1024,
                      rx: packet[0]['rx-bits-per-second'] / 1024 / 1024,
                    };

                    socket.emit('predio traffic', pkt);
                  }
                } else {
                  socket.emit('erro. ');
                }
              },
            );
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });

    this.middlewares();
    this.router();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));
  }

  router() {
    this.app.use(routes);
  }
}

export default new App().server;
