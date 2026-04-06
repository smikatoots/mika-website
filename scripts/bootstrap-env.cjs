const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "..", ".env.local"),
  quiet: true,
});
require("dotenv").config({ quiet: true });
