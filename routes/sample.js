const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");


router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/mail", async (req, res) => {
  let { userMail, subject, body, Regards } = req.body;
  //   console.log(userMail, subject, body);
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);
  let message = {
    from: process.env.EMAIL,
    to: userMail,
    subject: subject,
    html: `<h3>${body}</h3>
            <p>Regards</p>
            <p>${Regards}</p>`,
  };
  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "you should receive an email",
      });
    })
    .catch((error) => {
      return res.status(500).json({ error });
    });

  // res.status(201).json("getBill Successfully...!");
});

module.exports = router;