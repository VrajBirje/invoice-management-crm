var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'internhoarway@gmail.com',
    pass: '#Barcelona2015'
  }
});

var mailOptions = {
  from: 'internhoarway.com',
  to: 'fs21co035.vrajb@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});