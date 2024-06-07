const { pathToRegexp, match } = require("path-to-regexp");

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
  const result = this.regexp.exec(path);

  if (!result) {
    return false;
  }

  this.params = {};
  this.path = result[0];

  for (let i = 1; i < result.length; i++) {
    const key = this.keys[i - 1];
    const prop = key.name;
    const val = decodeURIComponent(result[i]);

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
    this.handle(req, res, next);
  } catch (err) {
    next(err);
  }
};

module.exports = Layer;
