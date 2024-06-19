const http = require("http");
const Router = require("./router");
const Layer = require("./layer");
const request = require("./request");
const mongoose = require("mongoose");

function Application() {
  this._router = new Router();
}

Application.prototype.use = function (path, fn) {
  if (typeof path === "function") {
    fn = path;
    path = "/";
  }
  const layer = new Layer(path, {}, fn);
  this._router.stack.push(layer);
};

Application.prototype.get = function (path, handler) {
  if (handler instanceof mongoose.Query) {
    this._router.get(path, async (req, res) => {
      try {
        const out = await handler;
        console.log({ message: "Operation Successfull", operationOutput: out });
        res
          .status(200)
          .send({ message: "Operation Successfull", operationOutput: out });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
  } else if (typeof handler === "function") {
    this._router.get(path, handler);
  } else {
    console.log("Unsupported handler type.");
  }
};

Application.prototype.post = function (path, handler) {
  if (handler instanceof mongoose.Query || handler instanceof mongoose.Model) {
    this._router.post(path, async (req, res) => {
      try {
        const out = await handler;
        console.log({ message: "Operation Successfull", operationOutput: out });
        res
          .status(200)
          .send({ message: "Operation Successfull", operationOutput: out });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
  } else if (typeof handler === "function") {
    this._router.post(path, handler);
  } else {
    console.log("Error : unsupported handler type");
  }
};

Application.prototype.put = function (path, handler) {
  if (handler instanceof mongoose.Query) {
    this._router.put(path, async (req, res) => {
      try {
        const out = await handler;
        console.log({ message: "Operation Successfull", operationOutput: out });
        res
          .status(200)
          .send({ message: "Operation Successfull", operationOutput: out });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
  } else if (typeof handler === "function") {
    this._router.put(path, handler);
  } else {
    console.log("Error : unsupported handler type");
  }
};

Application.prototype.delete = function (path, handler) {
  if (handler instanceof mongoose.Query) {
    this._router.delete(path, async (req, res) => {
      try {
        const out = await handler;
        console.log({ message: "Operation Successfull", operationOutput: out });
        res
          .status(200)
          .send({ message: "Operation Successfull", operationOutput: out });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
  } else if (typeof handler === "function") {
    this._router.delete(path, handler);
  } else {
    console.log("Error : unsupported handler type");
  }
};

Application.prototype.patch = function (path, handler) {
  if (handler instanceof mongoose.Query) {
    this._router.patch(path, async (req, res) => {
      try {
        const out = await handler;
        console.log({ message: "Operation Successfull", operationOutput: out });
        res
          .status(200)
          .send({ message: "Operation Successfull", operationOutput: out });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    });
  } else if (typeof handler === "function") {
    this._router.patch(path, handler);
  } else {
    console.log("Error : unsupported handler type");
  }
};

Application.prototype.listen = function (port, callback) {
  const server = http.createServer((req, res) => {
    this._router.handle(req, res, (err) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.statusCode = 404;
        res.end("Not Found");
      }
    });
  });
  server.listen(port, callback);
};

module.exports = Application;
