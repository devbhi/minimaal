var bodyParser = require("body-parser");
const Application = require("./application");
const mongoose = require("mongoose");

exports = module.exports = createApplication;

function createApplication() {
  return new Application();
}

function query(queryFn) {
  return async (req, res) => {
    try {
      console.log(queryFn(req));
      if ((await queryFn(req)) instanceof mongoose.Model) {
        console.log("in model");
        const out = await queryFn(req);
        // const out = await model(req);
        res.status(200).send(out);
        console.log(out);
      } else if (queryFn(req) instanceof mongoose.Query) {
        const query = queryFn(req);
        const out = await query.exec();
        res.status(200).send(out);
        console.log(out);
      } else {
        console.log(
          "Error : query function accept only mongoose model or query as input"
        );
        res.status(500).send({ error: "Internal Server Error" });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
}

global.query = query;
exports.json = bodyParser.json;
exports.raw = bodyParser.raw;
exports.text = bodyParser.text;
exports.urlencoded = bodyParser.urlencoded;
