const cron = require("node-cron");
const nodemailer = require('nodemailer');

class EmailMailer {
  task = cron.schedule("09 23 * * *", () => {
    this.sendMail().then(() => {
      console.log('Success send email')
    });
  });

  sendMail = async () => {
    let transaction, income, configMail, transporter, emailTarget, mail;

    transaction = Math.floor(Math.random() * 10) + 1;
    income = `Rp ${transaction * 10000},00`;

    configMail = {
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'youremailpassword'
      }
    };

    transporter = await nodemailer.createTransport(configMail);
    emailTarget = 'hamdanilm96@gmail.com';

    mail = {
      to: emailTarget,
      from: configMail.auth.user,
      subject: '[Daily Report] - Transaction & Total Income',
      html: `This is your daily report. Total <b>Success Transaction: ${transaction}</b>`
    };

    transporter.sendMail(mail);
  }
}

const emm = new EmailMailer().task;
emm.start();