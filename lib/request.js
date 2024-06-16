const url = require("url");
const querystring = require("querystring");
const body = require("body");

function request(req, res, next) {
  // console.log(req);
  const parsedUrl = url.parse(req.url, true);
  req.query = parsedUrl.query;
  req.params = {};
  // Use the body module to parse the request body
  body(req, res, (err, parsedBody) => {
    if (err) {
      next(err);
    } else {
      if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
        req.body = querystring.parse(parsedBody.toString());
      } else {
        req.body = parsedBody;
      }
      next();
    }
  });
  // Additional properties
  req.get = function (header) {
    return req.headers[header.toLowerCase()];
  };
}

module.exports = request;
