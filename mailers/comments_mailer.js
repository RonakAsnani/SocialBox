const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("inside new comment mailer");

  nodemailer.transporter.sendMail(
    {
      from: "socialbox@gmail.com",
      to: comment.user.email,
      subject: "new comment published",
      html: `<h1>Your comment is now published</h1>`,
    },
    (err, info) => {
      if (err) {
        console.log("eror in sending mail", err);
      }

      console.log("Message sent", info);
      return;
    }
  );
};
