const { parse } = require("url");
const errorUtil = require("./utils/errorUtil.js");
const responseUtil = require("./utils/responseUtil.js");
const tokenUtil = require("./utils/tokenUtil.js");

module.exports = (req, res) => {

  console.log(req.body);

  const { query } = parse(req.url, true);

  let commands = [];
  let error = errorUtil(query);

  switch (query.mode) {
    case 'patch-tokens-fast':
      commands.push({
        "type": "com.okta.identity.patch",
        "value": [{
          "op": "add",
          "path": "/claims/tenant",
          "value": "1234"
        }]
      });
      commands.push({
        "type": "com.okta.identity.patch",
        "value": [{
          "op": "add",
          "path": "/claims/beer",
          "value": "IPA"
        }]
      });
      commands.push({
        "type": "com.okta.access.patch",
        "value":[{
            "op": "add",
            "path": "/claims/tenant",
            "value": "1234"
          }]
      });
      commands.push({
        "type": "com.okta.access.patch",
        "value":[{
            "op": "add",
            "path": "/claims/roles",
            "value": ["Admin", "Owner"]
          }]
      });
      break;
    case 'patch-tokens':
      commands = tokenUtil.createPatchCommands(query);
    default:
  }

  responseUtil.returnCommands(req, res, commands, error);

};
