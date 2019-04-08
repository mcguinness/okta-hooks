const {
  parse
} = require("url");

module.exports = (req, res) => {

  const {
    query
  } = parse(req.url, true);

  //Default Command
  var response = {
    "commands": []
  };
  var statusCode = 200;

  switch (query.mode) {
    case 'error':
      response.error = {
        "errorSummary": "Customized Error Summary",
        "errorCauses": [{
          "errorSummary": "Customized Error Summary",
          "reason": "UNKNOWN"
        }]
      }
      break;
    case 'patch-tokens':
      response.commands.push({
        "type": "com.okta.tokens.access.patch",
        "value": [{
          "op": "add",
          "path": "/claims/extPatientId",
          "value": "1234"
        }]
      });
      response.commands.push({
        "type": "com.okta.tokens.identity.patch",
        "value":[{
            "op": "add",
            "path": "claims/guid",
            "value": "F0384685-F87D-474B-848D-2058AC5655A7"
          }]
      });
      break;
    case 'no-content':
      statusCode = 204;
    default:
  }

  res.writeHead(statusCode, //status code
    {
      "Content-Type": "application/json"
    }
  );

  res.end(JSON.stringify(response));
};
