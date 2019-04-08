const { parse } = require("url");
const errorUtil = require("./utils/errorUtil.js");
const profileUpdateUtil = require("./utils/profileUpdateUtil.js");

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
      response.error = errorUtil(query);
      break;
    case 'deny-registration':
      response.commands.push({
        "type": "com.okta.action.update",
        "value": {
          "registration": "DENY"
        }
      });
      break;
    case 'profile-update':
      response.commands.push(profileUpdateUtil(query));
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
