let babelRelayPlugin = require("babel-relay-plugin");
let schemaData = require("../data/schema.json").data;
module.exports = babelRelayPlugin(schemaData);
