import { Logger } from '@nestjs/common';
const nodemailer = require('nodemailer');

const transporter: any = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'abc@gmail.com',
    pass: 'abc',
  },
})

export const emailSend = (obj: any) => {
  const { email, generateOtp } = obj;
  let mailDetail: any = null;

  if (email && generateOtp) {
    mailDetail = {
      to: email,
      subject: 'OTP for new Password',
      html:
        '<h3>OTP for new password is </h3>' +
        '<h1 style=`font-weight:bold;`>' +
        generateOtp +
        '</h1>',
    };
  }

  let mailSending: any = transporter.sendMail(
    mailDetail,
    function (error: any, info: any) {
      if (error) {
        Logger.error(error);
      } else {
        Logger.log(' Email sent: ' + info.response);
      }
    },
  );
  return mailSending;
};

module.exports = { emailSend };
