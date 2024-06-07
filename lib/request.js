const url = require("url");

module.exports = {
  request(req) {
    req.params = {};
    req.query = url.parse(req.url, true).query;
    req.body = {};

    return req;
  },
};
