var restify = require('restify');
const request = require('request');
const {irohaExample} = require('./irohaExample');

function iroha(req, res, next) {
    irohaExample("nada", (cb) => {
        res.send(cb);
        next();
    });
}

var server = restify.createServer();
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.bodyParser());

server.get('/teste', iroha);

server.listen(8084, function () {
    console.log('%s listening at %s', server.name, server.url);
});
