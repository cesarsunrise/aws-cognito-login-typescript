"use strict";

require("dotenv").config();
const handler = require("./build");

// LAMBDA BODY MOCKDATA
const event = {
  body: JSON.stringify({
    email: "cesar@sunriseintegration.com",
    password: "Sun123456",
  }),
};

handler.run(event);
