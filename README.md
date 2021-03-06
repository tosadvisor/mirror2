<img src="https://taky.s3.amazonaws.com/31gm6glfzxkf.svg" height="225">

# mirror2
`mirror2` is designed to reverse proxy and "mitm" modify remote hosts. it
supports custom connect middlewares at both the routing-level and the
individual host level as well as sync string transforms and harmon select
modifiers.

_magic mirror on the wall, who is the fairest one of all?_

# quick start

```
git clone https://github.com/tosadvisor/mirror2
cd mirror2
npm i
node usage.js
```

optionally, for demo purposes

`echo "127.0.0.1 proxy.com" >> /etc/hosts`

open browser to `http://localhost:7777`

# usage

``` javascript
var mirror, server;

mirror = require('mirror2');

server = new mirror.ProxyManager({
  hosts: {

    'localhost': {

      // remote host to mirror
      host: 'stackoverflow.com',

      // enable ssl for connection to remote host
      enable_ssl: true,

      // synchronous source modifiers for text/html
      html_modifiers: [
        (function(x) {
          return x.replace('<title>', '<title>(mirror2) ');
        })
      ]
    },

    'proxy.com': {
      host: 'greatist.com',
      enable_ssl: false,

      // html head appendage for text/html
      append_head: "<script>alert('greatist.com')</script>",

      html_modifiers: [
        (function(x) {
          return x.replace('<title>', '<title>(mirror2) ');
        })
      ]
    }

  }
});

server.setup(function() {
  server.listen(7777);
  return console.log(":7777");
});
```

<img src="https://taky.s3.amazonaws.com/11gm75efdhkt.png" width=200>

## new mirror.ProxyManager(options={})
### events
#### proxy_man.on('proxy_spawned',cb)
#### proxy_man.on('proxy_manager_listening',cb)
#### proxy_man.on('request',cb)
#### proxy_man.on('request_ignored',cb)
#### proxy_man.on('request_delivered',cb)
#### proxy_man.on('error',cb)

## new mirror.Proxy(options={})
### events
#### proxy.on('proxy_listening',cb)
#### proxy.on('request',cb)
#### proxy.on('request_delivered',cb)
#### proxy.on('error',cb)

