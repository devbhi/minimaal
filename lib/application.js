const http = require("http");
const Router = require("./router");

function Application() {
  this._router = new Router();
}

Application.prototype.get = function (path, handler) {
  this._router.get(path, handler);
};

Application.prototype.listen = function (port, callback) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res);
  });
  server.listen(port, callback);
};

module.exports = Application;
