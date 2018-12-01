const { parse } = require("url");

module.exports = (req, res) => {
  const { query } = parse(req.url, true);

  res.writeHead(200, //status code
    {
      "Content-Type": "application/json"
    }
  );

  const responseCommands = {
    "commands": [{
      "type": "com.okta.action.update",
      "value": {
        "registration": "DENY"
      }
    }]
  }

  res.end(JSON.stringify(responseCommands));
};
