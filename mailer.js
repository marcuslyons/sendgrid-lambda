// 'use strict';

var sendgridMail = require("@sendgrid/mail");

module.exports.run = function(event, context, cb) {
  // ensure event is set
  if (!event) {
    return cb(new Error("EVENT IS NOT DEFINED"));
  }

  // ensure minimum environment variables are set
  if (!process.env.SENDGRID_API_KEY) {
    return cb(new Error("SENDGRID API KEY NOT SET"));
  }

  if (!process.env.SENDGRID_TO_EMAIL) {
    return cb(new Error("TO EMAIL NOT SET"));
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    return cb(new Error("FROM EMAIL NOT SET"));
  }

  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: event.info.subject,
    text: event.info.text,
    html: event.info.html
  };

  sendgridMail.send(msg, (error, result) => {
    if (error) {
      console.log(error.toString());
      return cb(new Error("MAIL SEND FAILED"));
    } else {
      return cb(null, {message: 'success'});
    }
  });

};
