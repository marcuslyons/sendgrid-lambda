// "use strict";

const mailer = require('./mailer.js');

exports.handler = (event, context) => {
  mailer.run(event, context, (error, result) => {
    context.done(error, result);
  });
};
