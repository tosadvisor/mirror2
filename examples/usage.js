var mirror, server;

mirror = require('./../');

server = new mirror.ProxyManager({
  hosts: {
    'local.shimlar.com': {
      host: 'game.shimlar.com',
      enable_ssl: true,
      silent: false,
      html_modifiers: [
        (function(x) {
          return x.replace('<title>', '<title>(mirror-mirror) ');
        })
      ]
    },
  }
});

server.setup(function() {
  server.listen(7777);
  return console.log(":7777");
});
