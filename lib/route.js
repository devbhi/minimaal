const Layer = require("./layer");

function Route(path) {
  this.path = path;
  this.stack = [];
}

Route.prototype.handle_method = function handle_method(method) {
  return this.stack.some((layer) => layer.method === method.toLowerCase());
};

Route.prototype.get = function (fn) {
  return this._addLayer("get", fn);
};

Route.prototype.post = function (fn) {
  return this._addLayer("post", fn);
};

Route.prototype.put = function (fn) {
  return this._addLayer("put", fn);
};

Route.prototype.delete = function (fn) {
  return this._addLayer("delete", fn);
};

Route.prototype.patch = function (fn) {
  return this._addLayer("patch", fn);
};

Route.prototype._addLayer = function (method, fn) {
  const layer = new Layer(this.path, {}, fn); // Use this.path instead of "/"
  layer.method = method;
  this.stack.push(layer);
  return this;
};

Route.prototype.dispatch = function dispatch(req, res, done) {
  const method = req.method.toLowerCase();
  let idx = 0;
  const stack = this.stack.filter((layer) => layer.method === method);

  function next(err) {
    if (err) {
      return done(err);
    }
    if (idx >= stack.length) {
      return done();
    }
    const layer = stack[idx++];
    if (layer.match(req.url)) {
      req.params = layer.params;
      return layer.handle_request(req, res, next);
    }
    next();
  }

  next();
};

module.exports = Route;
