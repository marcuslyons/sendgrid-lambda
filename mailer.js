// 'use strict';

const sendgridMail = require('@sendgrid/mail');

const checkEnvironment = (event) => {
  // ensure event is set
  if (!event) {
    return { success: false, error: 'EVENT IS NOT DEFINED' };
  }

  // ensure minimum environment variables are set
  if (!process.env.SENDGRID_API_KEY) {
    return { success: false, error: 'SENDGRID API KEY NOT SET' };
  }

  if (!process.env.SENDGRID_TO_EMAIL) {
    return { success: false, error: 'TO EMAIL NOT SET' };
  }

  if (!process.env.SENDGRID_FROM_EMAIL) {
    return { success: false, error: 'FROM EMAIL NOT SET' };
  }

  return { success: true };
};

const checkMessageData = ({ subject, text, html }) => {
  // ensure we have the parts necessary to send
  // the email

  if (!subject) {
    return { success: false, error: 'SUBJECT NOT SET' };
  }

  if (!text) {
    return { success: false, error: 'TEXT NOT SET' };
  }

  if (!html) {
    return { success: false, error: 'HTML NOT SET' };
  }

  return { success: true };
};

module.exports.run = (event, context, cb) => {
  const environment = checkEnvironment(event);

  if (!environment.success) {
    return cb(new Error(environment.error));
  }

  const messageData = checkMessageData(event.data);

  if (!messageData.success) {
    return cb(new Error(messageData.error));
  }

  let mailResult;

  sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.SENDGRID_TO_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: event.data.subject,
    text: event.data.text,
    html: event.data.html,
  };

  sendgridMail.send(msg, (error, result) => {
    if (error) {
      mailResult = cb(new Error('MAIL SEND FAILED'));
    }
    mailResult = cb(null, {
      message: 'success',
      details: result,
    });
  });

  return mailResult;
};
