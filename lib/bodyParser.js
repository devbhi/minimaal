module.exports = function bodyParser(req, res, next) {
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        req.body = JSON.parse(data);
      } catch (e) {
        return next(e);
      }
      next();
    });
  } else {
    next();
  }
};
