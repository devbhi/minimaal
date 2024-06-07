module.exports = {
  response(res) {
    res.status = function (code) {
      res.statusCode = code;
      return res;
    };

    res.send = function (body) {
      if (typeof body === "object") {
        res.setHeader("Content-Type", "application/json");
        body = JSON.stringify(body);
      }
      res.end(body);
    };

    res.json = function (body) {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(body));
    };

    return res;
  },
};
