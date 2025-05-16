const yaml = require("yamljs"); // Import yaml
const swaggerDocument = yaml.load("./openapi.yaml"); // Load swagger document

module.exports = {
  async getSwagger(req, res) {
    res.status(200).json(swaggerDocument);
  },
};
