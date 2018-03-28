"use strict";

var mailer = require("./mailer.js");

exports.handler = function(event, context) {
  mailer.run(event, context, function(error, result) {
    return context.done(error, result);
  });
};
