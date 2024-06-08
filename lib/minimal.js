var bodyParser = require("body-parser");
const Application = require("./application");

exports = module.exports = createApplication;

function createApplication() {
  return new Application();
}

exports.json = bodyParser.json;
exports.raw = bodyParser.raw;
exports.text = bodyParser.text;
exports.urlencoded = bodyParser.urlencoded;
