/* eslint-disable global-require */
// import Host from '../models/Host';
// import server from '../../app';

class MikrotikController {
  async arp(req, res) {
    const RosApi = require('node-routeros').RouterOSAPI;

    const conn = new RosApi({
      host: req.params.ip,
      user: 'admin',
      password: 'kekeziel0904',
    });

    conn
      .connect()
      .then(() => {
        conn
          .write('/ip/arp/print')
          .then((data) => {
            console.log('ARP TABLE FROM HOST', data);
            res.json(data);
            conn.close();
          })
          .catch((err) => {
            console.log(err);
            conn.close();
          });
      })
      .catch((err) => {
        console.log(err);
        res.send(err.message);
        conn.close();
      });
  }
}

export default new MikrotikController();
