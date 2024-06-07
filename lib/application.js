const http = require("http");
const Router = require("./router");
const Layer = require("./layer");

function Application() {
  this._router = new Router();
}

Application.prototype.use = function (path, fn) {
  if (typeof path === "function") {
    fn = path;
    path = "/";
  }
  const layer = new Layer(path, {}, fn);
  this._router.stack.push(layer);
};

Application.prototype.get = function (path, handler) {
  this._router.get(path, handler);
};

Application.prototype.post = function (path, handler) {
  this._router.post(path, handler);
};

Application.prototype.put = function (path, handler) {
  this._router.put(path, handler);
};

Application.prototype.delete = function (path, handler) {
  this._router.delete(path, handler);
};

Application.prototype.patch = function (path, handler) {
  this._router.patch(path, handler);
};

Application.prototype.listen = function (port, callback) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });
  });
  server.listen(port, callback);
};

module.exports = Application;
