const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  //console.log("inside new comment mailer");

  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/mailers/comments/new_comment.ejs"
  );
  nodemailer.transporter.sendMail(
    {
      from: "socialbox@gmail.com",
      to: comment.user.email,
      subject: "new comment published",
      html: htmlString,
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
