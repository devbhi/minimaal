function Route(path, method, handler) {
  this.path = path;
  this.method = method;
  this.handler = handler;
}

Route.prototype.match = function (url, method) {
  return this.path === url && this.method === method;
};

Route.prototype.handle = function (req, res) {
  this.handler(req, res);
};

module.exports = Route;
