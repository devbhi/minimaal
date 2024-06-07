const Route = require("./route");
const Layer = require("./layer");
const methods = ["get", "post", "put", "delete", "patch"];
const { request } = require("./request");
const { response } = require("./response");

function Router() {
  this.stack = [];
}

Router.prototype.route = function (path) {
  const route = new Route(path);
  const layer = new Layer(path, {}, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
};

methods.forEach((method) => {
  Router.prototype[method] = function (path, fn) {
    const route = this.route(path);
    route[method](fn);
    return this;
  };
});

Router.prototype.handle = function (req, res, out) {
  request(req);
  response(res);

  const { url, method } = req;
  let idx = 0;

  const next = (err) => {
    if (err) {
      return out(err);
    }
    if (idx >= this.stack.length) {
      return out();
    }
    const layer = this.stack[idx++];
    if (
      layer.match(url) &&
      (!layer.route || layer.route.handle_method(method))
    ) {
      return layer.handle_request(req, res, next);
    }
    next();
  };

  next();
};

module.exports = Router;
