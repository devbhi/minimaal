const { pathToRegexp } = require("path-to-regexp");

function Layer(path, options, fn) {
  this.path = path;
  this.handle = fn;
  this.name = fn.name || "<anonymous>";
  this.keys = [];
  this.regexp = pathToRegexp(path, this.keys, options);
  this.params = undefined;
  this.path = undefined;
}

Layer.prototype.match = function matchPath(path) {
  const matchResult = this.regexp.exec(path);

  if (!matchResult) {
    return false;
  }

  this.params = {};
  this.path = matchResult[0];

  for (let i = 1; i < matchResult.length; i++) {
    const key = this.keys[i - 1];
    const prop = key.name;
    const val = decodeURIComponent(matchResult[i]);

    if (
      val !== undefined ||
      !Object.prototype.hasOwnProperty.call(this.params, prop)
    ) {
      this.params[prop] = val;
    }
  }

  return true;
};

Layer.prototype.handle_request = function handle_request(req, res, next) {
  try {
    req.params = this.params || {};
    this.handle(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = Layer;
