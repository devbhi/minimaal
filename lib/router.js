const Route = require("./route");

function Router() {
  this.routes = [];
}

Router.prototype.get = function (path, handler) {
  const route = new Route(path, "GET", handler);
  this.routes.push(route);
};

Router.prototype.handle = function (req, res) {
  const { method, url } = req;
  for (const route of this.routes) {
    if (route.match(url, method)) {
      return route.handle(req, res);
    }
  }
  res.statusCode = 404;
  res.end("Not Found");
};

module.exports = Router;
