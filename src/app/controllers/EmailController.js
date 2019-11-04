class EmailController {
  async bloqueioIp(req, res) {
    const exec = require('node-ssh-exec');
    const { ip } = req.params;

    const config = {
      host: '200.225.114.2',
      username: 'root',
      password: 'tiagoviaSUP',
    };

    const command = `iptables -L -n | grep ${ip}`;
    const command2 = `fail2ban-client set zimbra-sasl unbanip ${ip}`;
    const command3 = `fail2ban-client set zimbra-sasl2 unbanip ${ip}`;
    const command4 = `fail2ban-client set zimbra-sasl3 unbanip ${ip}`;

    exec(config, command, (error, response) => {
      if (error) {
        throw error;
      }
      if (response) {
        exec(config, command2, (error, response) => {
          console.log(response);
          if (response.indexOf('is not banned') !== -1) {
            exec(config, command3, (error, response) => {
              console.log(response);
              if (response.indexOf('is not banned') !== -1) {
                exec(config, command4, (error, response) => {
                  console.log(response);
                  if (response.indexOf('is not banned') !== -1) {
                    res.json('Erro ao Desbloqueado');
                  } else {
                    res.json('está Desbloqueado');
                  }
                });
              } else {
                res.json('está Desbloqueado');
              }
            });
          } else {
            res.json('está Desbloqueado');
          }
        });
      } else {
        res.json('não está bloqueado');
      }
      // res.json(response);
      console.log(response);
    });
  }
}

export default new EmailController();
