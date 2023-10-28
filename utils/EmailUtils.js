const {transport} = require('../config/email')

exports.sendEmail = (name, email, subject, phone, message) => {
  let mailOptions = {
    from: `${email}`,
    to: `service-laptop@jc.com`,
    subject: `${subject}`,
    text: `Nama: ${name}\nNomor Hp: ${phone}\n\n${message} `
  }

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      // return res.status(400).json({ detail: "Token gagal dikirim" });
    } else {
      console.log(info.response);
      // return res.status(200).json(customer);
    }
  });
}