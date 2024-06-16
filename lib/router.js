const Route = require("./route");
const Layer = require("./layer");
const methods = ["get", "post", "put", "delete", "patch"];
const request = require("./request");
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
  response(res);
  // console.log(req);

  const { url, method } = req;
  let idx = 0;

  const next = (err) => {
    if (err) {
      res.statusCode = 500;
      return res.end("Internal Server Error");
    }
    if (idx >= this.stack.length) {
      res.statusCode = 404;
      return res.end("Not Found");
    }
    const layer = this.stack[idx++];
    if (
      layer.match(url) &&
      (!layer.route || layer.route.handle_method(method))
    ) {
      req.route = layer.route; // Set the route property on the request object
      return layer.handle_request(req, res, next);
    }
    next();
  };
  request(req, res, next);
};

module.exports = Router;
